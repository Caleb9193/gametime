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
	var Shooter = __webpack_require__(3);
	var shooter = new Shooter(context);
	var LevelOne = __webpack_require__(4);

	var bullets = [];
	var ammo = 5;
	var level = 1;

	if (level === 1) {
	  var currentLevel = new LevelOne(context);
	}

	canvas.addEventListener('click', function (target) {
	  var click = getClickPosition(target);
	  var angleRadians = Math.atan2(click.y - 470, click.x - 80);
	  var directionX = Math.cos(angleRadians) * 14;
	  var directionY = Math.sin(angleRadians) * 14;

	  if (bullets.length === 0 && ammo > 0) {
	    bullets.push(new Bullet(directionX, directionY, context));
	    ammo--;
	  }
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  shooter.draw();
	  currentLevel.draw();
	  bullets.forEach(function (bullet) {
	    if (bullet.bounceCount < 8) {
	      bullet.draw().move(currentLevel);
	    } else {
	      bullets.shift();
	    }
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

	function Bullet(directionX, directionY, context) {
	  this.x = 80;
	  this.y = 470;
	  this.height = 3;
	  this.width = 3;
	  this.radius = 4;
	  this.directionX = directionX;
	  this.directionY = directionY;
	  this.context = context;
	  this.bounceCount = 0;
	}

	Bullet.prototype.draw = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	  this.context.fillStyle = "#b5b5b5";
	  this.context.fill();

	  return this;
	};

	Bullet.prototype.move = function (currentLevel) {
	  this.collisionCheck(currentLevel.obstacles, currentLevel.targets);
	  this.x += this.directionX;
	  this.y += this.directionY;

	  return this;
	};

	Bullet.prototype.collisionCheck = function (obstacles, targets) {
	  var posX = this.x + this.radius;
	  var posY = this.y + this.radius;

	  // check collision with left & right canvas borders
	  if (posX >= this.context.canvas.width || posX <= this.radius) {
	    this.directionX *= -1;
	    this.bounceCount++;
	  }

	  // check collision with top & bottom canvas borders
	  if (posY >= this.context.canvas.height || posY <= this.radius) {
	    this.directionY *= -1;
	    this.bounceCount++;
	  }

	  // check collision with obstacles
	  obstacles.forEach(function (obstacle) {
	    if (posX >= obstacle.x && this.x - this.radius <= obstacle.x + obstacle.width && posY >= obstacle.y && this.y - this.radius <= obstacle.y + obstacle.height) {
	      this.changeDirection(obstacle);
	      this.bounceCount++;
	    }
	  }, this);

	  // check collision with targets
	  targets.forEach(function (target) {
	    if (posX >= target.x && this.x - this.radius <= target.x + target.width && posY >= target.y && this.y - this.radius <= target.y + target.height) {
	      target.display = false;
	    }
	  }, this);

	  return this;
	};

	Bullet.prototype.changeDirection = function (obstacle) {
	  var previousX = this.x - this.directionX;
	  var previousY = this.y - this.directionY;
	  var obstacleRight = obstacle.x + obstacle.width;
	  var obstacleBottom = obstacle.y + obstacle.height;

	  // change X direction
	  if (this.checkDirectionX(obstacle.x, obstacleRight, previousX)) {
	    this.directionX *= -1;
	  }

	  // change Y direction
	  if (this.checkDirectionY(obstacle.y, obstacleBottom, previousY)) {
	    this.directionY *= -1;
	  }
	};

	Bullet.prototype.checkDirectionX = function (obstacleLeft, obstacleRight, previousX) {
	  // check if collision on right side
	  return obstacleRight < previousX - this.radius && obstacleRight >= this.x - this.radius ||
	  // check if collision on left side
	  obstacleLeft > previousX + this.radius && obstacleLeft <= this.x + this.radius;
	};

	Bullet.prototype.checkDirectionY = function (obstacleTop, obstacleBottom, previousY) {
	  // check if collision on bottom side
	  return obstacleBottom < previousY - this.radius && obstacleBottom >= this.y - this.radius ||
	  // check if collision on top side
	  obstacleTop > previousY + this.radius && obstacleTop <= this.y + this.radius;
	};

	module.exports = Bullet;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Shooter(context) {
	  // this.x = 70;
	  // this.y = 450;
	  // this.height = 50;
	  // this.width = 10;
	  this.context = context;
	}

	Shooter.prototype.draw = function () {
	  var img = new Image();
	  img.src = 'http://i.imgur.com/sojxivK.png';
	  this.context.drawImage(img, 70, 450);

	  // this.context.fillStyle = "#e1ecf6";
	  // this.context.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = Shooter;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(5);
	var Target = __webpack_require__(6);

	function LevelOne(context) {
	  var obstacleMidVert = new Obstacle(350, 100, 20, 200, context);
	  var obstacleMidHoriz = new Obstacle(550, 200, 200, 15, context);
	  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
	  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
	  var targetRight = new Target(855, 250, context);
	  var targetLeft = new Target(0, 150, context);
	  var targetMid = new Target(650, 150, context);
	  this.context = context;
	  this.score = 0;
	  this.targets = [targetRight, targetLeft, targetMid];
	  this.obstacles = [obstacleMidVert, obstacleMidHoriz, obstacleEdgeVert, obstacleEdgeHoriz];
	}

	LevelOne.prototype.draw = function () {
	  this.obstacles.forEach(function (obstacle) {
	    obstacle.draw();
	  });
	  this.targets.forEach(function (target) {
	    target.draw();
	  });
	};

	module.exports = LevelOne;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Obstacle(x, y, width, height, context) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.context = context;
	}

	Obstacle.prototype.draw = function () {
	  var img = new Image();
	  img.src = 'http://bgfons.com/upload/brick_texture3348.jpg';
	  this.context.drawImage(img, this.x, this.y, this.width, this.height);
	};

	module.exports = Obstacle;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Target(x, y, context) {
	  this.x = x;
	  this.y = y;
	  this.width = 17;
	  this.height = 50;
	  this.context = context;
	  this.display = true;
	}

	Target.prototype.draw = function () {
	  if (this.display) {
	    var img = new Image();
	    img.src = 'http://i.imgur.com/eWbMI9a.png';
	    this.context.drawImage(img, this.x, this.y, this.width, this.height);
	  }
	};

	module.exports = Target;

/***/ }
/******/ ]);