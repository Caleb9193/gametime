/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var getClickPosition = __webpack_require__(1);
	var Bullet = __webpack_require__(2);

	var bullets = [];

	canvas.addEventListener('click', function (target) {
	  var click = getClickPosition(target);
	  bullets.push(new Bullet(click.x, click.y, 4, 20, 20));
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  bullets.forEach(function (bullet) {
	    bullet.draw().move();
	  });
	  requestAnimationFrame(gameLoop);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	function getClickPosition(e) {
	  function getPosition(element) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while (element) {
	      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
	      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
	      element = element.offsetParent;
	    }

	    return { x: xPosition, y: yPosition };
	  }

	  var parentPosition = getPosition(e.currentTarget);
	  var xPosition = e.clientX - parentPosition.x;
	  var yPosition = e.clientY - parentPosition.y;

	  return { x: xPosition, y: yPosition };
	}

	module.exports = getClickPosition;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function Bullet(x, y, radius, speedX, speedY) {
	  this.x = x;
	  this.y = y;
	  this.height = 3;
	  this.width = 3;
	  this.radius = radius;
	  this.speedX = speedX;
	  this.speedY = speedY;
	}

	Bullet.prototype.draw = function () {
	  context.beginPath();
	  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	  context.fillStyle = "#000000";
	  context.fill();
	  return this;
	};

	Bullet.prototype.move = function () {
	  if (this.x > canvas.width - this.width) {
	    this.speedX = -this.speedX;
	  }
	  if (this.x < 0) {
	    this.speedX = -this.speedX;
	  }
	  this.x += this.speedX;

	  if (this.y > canvas.height - this.height) {
	    this.speedY = -this.speedY;
	  }
	  if (this.y < 0) {
	    this.speedY = -this.speedY;
	  }
	  this.y += this.speedY;
	  return this;
	};

	module.exports = Bullet;

/***/ }
/******/ ]);