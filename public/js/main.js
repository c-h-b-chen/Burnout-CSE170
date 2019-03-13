

//JSON Time

var times = {
	"30": 30,
	"35": 35,
	"40": 40,
	"45": 45,
	"50": 50,
	"55": 55,
	"60": 60
}

//Magnifying Glass
if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

var ball;
var w;
var h;

function init()
{
	getMedi();
	ball = document.getElementById("ball");
	w = window.innerWidth;
	h = window.innerHeight;
	
	ball.style.left = (w/2)-50+"px";
	ball.style.top = (h/2)-50+"px";
	ball.velocity = {x:0,y:0}
	ball.position = {x:0,y:0}

	if (window.DeviceOrientationEvent) {
		
		window.addEventListener("deviceorientation", function(event) 
		{
			ball.velocity.y = Math.round(event.beta);
			ball.velocity.x = Math.round(event.gamma);
		}
		)
	}
	else {
		alert("Sorry, your browser doesn't support Device Orientation");
	} ;

	updateBall();
}

function updateBall()
{
	ball.position.x += ball.velocity.x;
	ball.position.y += ball.velocity.y;

	if(ball.position.x > (w-100) && ball.velocity.x > 0)
	{
		ball.position.x = w-100;
	}

	if(ball.position.x < 0 && ball.velocity.x < 0)
	{
		ball.position.x = 0;
	}

	if(ball.position.y > (h-100) && ball.velocity.y > 0)
	{
		ball.position.y = h-100;
	}

	if(ball.position.y < 0 && ball.velocity.y < 0)
	{
		ball.position.y = 0;
	}

	ball.style.top = ball.position.y + "px"
	ball.style.left = ball.position.x + "px"

    requestAnimationFrame( updateBall );//KEEP ANIMATING
}

var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=300;
var HEIGHT=300;
var rafID = null;

 function getMedi() {

    // grab our canvas
    canvasContext = document.getElementById( "meter" ).getContext("2d");

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        // ask for an audio input
        navigator.getUserMedia(
        {
        	"audio": {
        		"mandatory": {
        			"googEchoCancellation": "false",
        			"googAutoGainControl": "false",
        			"googNoiseSuppression": "false",
        			"googHighpassFilter": "false"
        		},
        		"optional": []
        	},
        }, gotStream, didntGetStream);
    } catch (e) {
    	alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
	alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    //Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    //kick off the visual updating
    drawLoop();
}


function drawLoop( time ) {
    // clear the background

    canvasContext.clearRect(0,0,WIDTH,HEIGHT);
    canvasContext.globalAlpha = 0.4;
    //canvasContext.closePath();
    //canvasContext.arc(0, 0, 0, 0, 2 * Math.PI, false);
    //canvasContext.fill();
    //canvasContext.stroke();
    // check if we're currently clipping
    if (meter.volume > .8)
    	canvasContext.fillStyle = "red";
    else 
    	canvasContext.fillStyle = "yellow";
    // draw a bar based on the current volume
    // canvasContext.fillRect(0, 0, WIDTH/4, meter.volume*HEIGHT*2.4 );
    // canvasContext.fillRect(WIDTH/4, 0, WIDTH/4, meter.volume*HEIGHT*4.4 );
    // canvasContext.fillRect(WIDTH/2, 0, WIDTH/4, meter.volume*HEIGHT*3.4 );
    // canvasContext.fillRect(WIDTH-WIDTH/4, 0, WIDTH/4, meter.volume*HEIGHT*1.4 );
    canvasContext.beginPath();
    canvasContext.arc(150, 150, meter.volume*150, 0, 2 * Math.PI, false);
    canvasContext.closePath();
    canvasContext.fill();
    

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );

}


