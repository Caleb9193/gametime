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
/***/ function(module, exports) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var bullets = [];

	function Bullet(x, y, radius, speedX, speedY) {
	  this.x = x;
	  this.y = y;
	  this.height = 5;
	  this.width = 5;
	  this.radius = radius;
	  this.speedX = speedX;
	  this.speedY = speedY;
	}

	Bullet.prototype.draw = function () {
	  context.beginPath();
	  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
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

	canvas.addEventListener('click', function (target) {
	  var click = getClickPosition(target);
	  bullets.push(new Bullet(click.x, click.y, 5, 10, 10));
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  bullets.forEach(function (bullet) {
	    bullet.draw().move();
	  });
	  requestAnimationFrame(gameLoop);
	});

/***/ }
/******/ ]);