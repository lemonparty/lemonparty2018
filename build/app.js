/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _bouncing_lemon = __webpack_require__(2);

var _bouncing_lemon2 = _interopRequireDefault(_bouncing_lemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i = 0;
var currentIndex = void 0;
var currentColors = void 0;
var colors = [["deeppink", "deepskyblue"], ["turquoise", "orangered"], ["springgreen", "yellow"], ["red", "aqua"], ["chartreuse", "magenta"], ["darkviolet", "orange"],

// the set that is defined in the css goes last
["yellow", "chartreuse"]];

setInterval(function () {
	currentIndex = i % colors.length;
	currentColors = colors[currentIndex];

	document.body.style.background = currentColors[0];
	document.body.style.color = currentColors[1];

	i++;
}, 1000);

_bouncing_lemon2.default.init();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	SCREEN_WIDTH: window.innerWidth,
	SCREEN_HEIGHT: window.innerHeight,
	LEMON_WIDTH: 249,
	LEMON_HEIGHT: 180,
	DELTA_X: 3,
	DELTA_Y: 4,

	init: function init() {
		this.CANVAS = document.getElementById("lemon-canvas");
		this.CONTEXT = this.CANVAS.getContext("2d");

		// make the canvas full screen
		this.CANVAS.width = this.SCREEN_WIDTH;
		this.CANVAS.height = this.SCREEN_HEIGHT;

		this.loadImage();
	},
	startInterval: function startInterval() {
		var _this = this;

		var currentX = 100;
		var currentY = 200;

		setInterval(function () {
			_this.CONTEXT.clearRect(0, 0, _this.SCREEN_WIDTH, _this.SCREEN_HEIGHT);
			_this.draw(currentX, currentY);

			// flip the deltas if we get out of range
			if (currentX + _this.LEMON_WIDTH > _this.SCREEN_WIDTH || currentX < 0) {
				_this.DELTA_X = _this.DELTA_X * -1;
			}

			if (currentY + _this.LEMON_HEIGHT > _this.SCREEN_HEIGHT || currentY < 0) {
				_this.DELTA_Y = _this.DELTA_Y * -1;
			}

			currentX += _this.DELTA_X;
			currentY += _this.DELTA_Y;
		}, 16);
	},
	loadImage: function loadImage() {
		var _this2 = this;

		this.LEMON = new Image();

		this.LEMON.onload = function () {
			_this2.startInterval();
		};

		this.LEMON.src = "./images/lemon-test.png";
	},
	draw: function draw(x, y) {
		this.CONTEXT.drawImage(this.LEMON, x, y);
	}
};

/***/ })
/******/ ]);