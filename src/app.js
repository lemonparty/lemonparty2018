import "./app.scss";

var i = 0;
var currentIndex;
var currentColors;
var colors = [
	["deeppink", "deepskyblue"],
	["turquoise", "orangered"],
	["springgreen", "yellow"],
	["red", "aqua"],
	["chartreuse", "magenta"],
	["darkviolet", "orange"],

	// the starting set goes last
	["yellow", "chartreuse"],
];

setInterval(function() {
	currentIndex = i % colors.length;
	currentColors = colors[currentIndex];

	document.body.style.background = currentColors[0];
	document.body.style.color = currentColors[1];

	i++;
}, 1000);
