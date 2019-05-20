var timer;

function fly() {
	var v0 = 10;
	var v = v0;
	var a = -1;
	var t = 0.5;
	var s = 0;
	var img = $("#container>img");
	img.css("top", "290px");
	clearInterval(timer);
	timer = setInterval(function() {
		s = v * t + 0.5 * a * t * t;
		v = v + a * t;
		img.css("top", (img.position().top - s)+"px");
		if(img.position().top>290)  clearInterval(timer);
	}, 10);
}

$(document).ready(function() {
	$("form input").click(fly);
});