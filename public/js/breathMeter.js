
//Breath
var texts = ["Take a Deep Breath in", "Slowly Blow Out", "Take a Deep Breath in", "Slowly Blow Out"];
var count = 0;


$(document).ready(function() {
	$(".breather").html(texts[0]);
	function fadeText() {
		$(".breather").fadeOut(500, function () {
			$(this).html(texts[count]).fadeIn(500);
		});
		if(count < texts.length) {count++;}
	}
	interv = setInterval(fadeText, 5000);
	if(count > texts.length) {
		clearInterval(interv);
	}
});
