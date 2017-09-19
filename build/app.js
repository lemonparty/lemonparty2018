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

var _lemon = __webpack_require__(3);

var _lemon2 = _interopRequireDefault(_lemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  SCREEN_WIDTH: window.innerWidth,
  SCREEN_HEIGHT: window.innerHeight,
  LEMON_WIDTH: 249,
  LEMON_HEIGHT: 180,
  LEMON_SRCS: ["./images/lemon-test.png", "./images/lemon-test.png"],
  lemons: [],

  init: function init() {
    this.canvas = document.getElementById("lemon-canvas");
    this.context = this.canvas.getContext("2d");

    // make the canvas full screen
    this.canvas.width = this.SCREEN_WIDTH;
    this.canvas.height = this.SCREEN_HEIGHT;

    this.createLemons();
    this.startAnimation();
  },
  createLemons: function createLemons() {
    var _this = this;

    this.LEMON_SRCS.forEach(function (src) {
      _this.lemons.push(new _lemon2.default(src));
    });
  },
  startAnimation: function startAnimation() {
    var _this2 = this;

    setInterval(function () {
      _this2.clearCanvas();

      _this2.lemons.forEach(function (lemon) {
        lemon.move();
        _this2.draw(lemon);
      });
    }, 16);
  },
  clearCanvas: function clearCanvas() {
    this.context.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
  },
  draw: function draw(lemon) {
    var x = lemon.x * (this.SCREEN_WIDTH - lemon.imageWidth);
    var y = lemon.y * (this.SCREEN_HEIGHT - lemon.imageHeight);
    this.context.drawImage(lemon.image, x, y);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lemon = function () {
  function Lemon(imageSrc) {
    _classCallCheck(this, Lemon);

    this.x = Math.random();
    this.y = Math.random();
    this.deltaX = Math.random() / 100;
    this.deltaY = Math.random() / 100;
    this.loadImage(imageSrc);
  }

  _createClass(Lemon, [{
    key: "loadImage",
    value: function loadImage(imageSrc) {
      var _this = this;

      this.image = new Image();
      this.image.onload = function () {
        _this.imageWidth = _this.image.width;
        _this.imageHeight = _this.image.height;
      };
      this.image.src = imageSrc;
    }
  }, {
    key: "move",
    value: function move() {
      if (this.x > 1 || this.x < 0) {
        this.deltaX *= -1;
      }

      if (this.y > 1 || this.y < 0) {
        this.deltaY *= -1;
      }

      this.x += this.deltaX;
      this.y += this.deltaY;
    }
  }]);

  return Lemon;
}();

exports.default = Lemon;

/***/ })
/******/ ]);