

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

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}


