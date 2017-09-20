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


var _background_changer = __webpack_require__(1);

var _background_changer2 = _interopRequireDefault(_background_changer);

var _lemon_party = __webpack_require__(2);

var _lemon_party2 = _interopRequireDefault(_lemon_party);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_background_changer2.default.init();
_lemon_party2.default.init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var COLORS = [["deeppink", "deepskyblue"], ["turquoise", "orangered"], ["springgreen", "yellow"], ["red", "aqua"], ["chartreuse", "magenta"], ["darkviolet", "orange"],

// the set that is defined in the css goes last
["yellow", "chartreuse"]];

exports.default = {
  i: 0,

  init: function init() {
    var _this = this;

    setInterval(function () {
      var currentIndex = _this.i % COLORS.length;

      var _COLORS$currentIndex = _slicedToArray(COLORS[currentIndex], 2),
          background = _COLORS$currentIndex[0],
          color = _COLORS$currentIndex[1];

      document.body.style.background = background;
      document.body.style.color = color;

      _this.i++;
    }, 1000);
  }
};

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

var LEMON_SRCS = ["./images/lemon-test.png", "./images/lemon-test.png"];
var FRAMES_PER_SECOND = 16;

exports.default = {
  lemons: [],

  init: function init() {
    this.canvas = document.getElementById("lemon-canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.createLemons();
    this.startAnimation();
  },
  createLemons: function createLemons() {
    var _this = this;

    LEMON_SRCS.forEach(function (src) {
      _this.lemons.push(new _lemon2.default(src));
    });
  },
  startAnimation: function startAnimation() {
    setInterval(this.renderFrame.bind(this), FRAMES_PER_SECOND);
  },
  renderFrame: function renderFrame() {
    var _this2 = this;

    this.clearCanvas();

    this.lemons.forEach(function (lemon) {
      lemon.move();
      _this2.draw(lemon);
    });
  },
  clearCanvas: function clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw: function draw(lemon) {
    var x = lemon.x * (this.canvas.width - lemon.imageWidth);
    var y = lemon.y * (this.canvas.height - lemon.imageHeight);
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

    this.imageWidth = 0;
    this.imageHeight = 0;
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);