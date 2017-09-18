import "./app.scss";

import BouncingLemon from "./bouncing_lemon";

let i = 0;
let currentIndex;
let currentColors;
const colors = [
	["deeppink", "deepskyblue"],
	["turquoise", "orangered"],
	["springgreen", "yellow"],
	["red", "aqua"],
	["chartreuse", "magenta"],
	["darkviolet", "orange"],

	// the set that is defined in the css goes last
	["yellow", "chartreuse"],
];

setInterval(function() {
	currentIndex = i % colors.length;
	currentColors = colors[currentIndex];

	document.body.style.background = currentColors[0];
	document.body.style.color = currentColors[1];

	i++;
}, 1000);

BouncingLemon.init();
