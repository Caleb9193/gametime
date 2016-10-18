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
	var Scoreboard = __webpack_require__(4);
	var level = 1;
	var scoreboard = new Scoreboard(context, level);
	var LevelOne = __webpack_require__(5);
	var LevelTwo = __webpack_require__(8);
	var LevelThree = __webpack_require__(9);

	var bullets = [];

	if (scoreboard.level === 1) {
	  var currentLevel = new LevelOne(context);
	}
	function checkLevel() {
	  if (scoreboard.level === 2) {
	    currentLevel = new LevelTwo(context);
	  } else if (scoreboard.level === 3) {
	    currentLevel = new LevelThree(context);
	  }
	}

	canvas.addEventListener('click', function (target) {
	  var click = getClickPosition(target);
	  var angleRadians = Math.atan2(click.y - 470, click.x - 80);
	  var directionX = Math.cos(angleRadians) * 14;
	  var directionY = Math.sin(angleRadians) * 14;

	  if (currentLevel.ammo > 0 && scoreboard.targetsLeft > 0) {
	    bullets.push(new Bullet(directionX, directionY, context));
	    currentLevel.ammo--;
	  }
	});

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  shooter.draw();
	  scoreboard.draw(currentLevel, bullets);
	  currentLevel.draw();
	  bullets.forEach(function (bullet) {
	    if (bullet.bounceCount < 8) {
	      bullet.draw().move(currentLevel);
	    } else {
	      bullets.shift();
	    }
	  });
	  if (scoreboard.targetsLeft === 0) {
	    bullets = [];
	    checkLevel();
	    setTimeout(function () {
	      requestAnimationFrame(gameLoop);
	    }, 3000);
	  } else {
	    requestAnimationFrame(gameLoop);
	  }
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
/***/ function(module, exports) {

	function Scoreboard(context, level) {
	  this.targetsLeft = 0;
	  this.context = context;
	  this.level = level;
	}

	Scoreboard.prototype.draw = function (currentLevel, bullets) {
	  this.score(currentLevel);
	  this.getText(currentLevel, bullets);
	};

	Scoreboard.prototype.score = function (currentLevel) {
	  var killCount = 0;

	  currentLevel.targets.forEach(function (target) {
	    if (!target.display) {
	      killCount++;
	    }
	  });

	  this.targetsLeft = currentLevel.targets.length - killCount;
	};

	Scoreboard.prototype.getText = function (currentLevel, bullets) {
	  if (this.targetsLeft === 0) {
	    // if game won
	    gameWinText(currentLevel, this);
	    this.level += 1;
	  } else if (currentLevel.ammo === 0 && bullets.length === 0) {
	    // if game lost
	    gameLoseText(currentLevel, this);
	  } else {
	    // if game in progress
	    gameText(currentLevel, this);
	  }

	  return this;
	};

	function gameWinText(currentLevel, that) {
	  that.context.font = "35px Verdana";
	  that.context.fillStyle = "white";
	  that.context.textAlign = "center";
	  that.context.fillText("Score: " + (100 + currentLevel.ammo * 100), that.context.canvas.width / 2, 60);

	  return that;
	}

	function gameLoseText(currentLevel, that) {
	  that.context.font = "40px Verdana";
	  that.context.fillStyle = "#6b111b";
	  that.context.textAlign = "center";
	  that.context.fillText("YOU RAN OUT OF AMMO. PLEASE TRY AGAIN.", that.context.canvas.width / 2, 60);

	  return that;
	}

	function gameText(currentLevel, that) {
	  that.context.font = "14px Verdana";
	  that.context.fillStyle = "white";
	  that.context.beginPath();
	  that.context.textAlign = "left";
	  that.context.fillText("Targets Remaining: " + that.targetsLeft, 10, 20);
	  that.context.closePath();

	  that.context.beginPath();
	  that.context.textAlign = "right";
	  that.context.fillText("Shots Remaining: " + currentLevel.ammo, 1090, 20);

	  return that;
	}

	module.exports = Scoreboard;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(6);
	var Target = __webpack_require__(7);

	function LevelOne(context) {
	  var obstacleMidVert = new Obstacle(350, 100, 20, 200, context);
	  var obstacleMidHoriz = new Obstacle(550, 200, 200, 15, context);
	  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
	  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
	  var targetRight = new Target(855, 250, context);
	  var targetLeft = new Target(0, 150, context);
	  var targetMid = new Target(650, 150, context);
	  this.context = context;
	  this.ammo = 5;
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
/* 6 */
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
/* 7 */
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(6);
	var Target = __webpack_require__(7);

	function LevelTwo(context) {
	  var obstacleRightVert = new Obstacle(955, 370, 20, 30, context);
	  var obstacleRightHighHoriz = new Obstacle(875, 300, 50, 20, context);
	  var obstacleRightLowHoriz = new Obstacle(875, 400, 100, 20, context);
	  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
	  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
	  var targetRight = new Target(855, 250, context);
	  var targetLeft = new Target(0, 150, context);
	  var targetMid = new Target(900, 350, context);
	  this.context = context;
	  this.ammo = 5;
	  this.targets = [targetRight, targetLeft, targetMid];
	  this.obstacles = [obstacleRightVert, obstacleRightHighHoriz, obstacleEdgeVert, obstacleEdgeHoriz, obstacleRightLowHoriz];
	}

	LevelTwo.prototype.draw = function () {
	  this.obstacles.forEach(function (obstacle) {
	    obstacle.draw();
	  });
	  this.targets.forEach(function (target) {
	    target.draw();
	  });
	};

	module.exports = LevelTwo;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(6);
	var Target = __webpack_require__(7);

	function LevelThree(context) {
	  var obstacleRightVert = new Obstacle(955, 370, 20, 30, context);
	  var obstacleRightHighHoriz = new Obstacle(875, 300, 50, 20, context);
	  var obstacleRightLowHoriz = new Obstacle(875, 400, 100, 20, context);
	  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
	  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
	  var targetRight = new Target(855, 250, context);
	  var targetLeft = new Target(0, 150, context);
	  var targetMid = new Target(900, 350, context);
	  this.context = context;
	  this.ammo = 5;
	  this.targets = [targetRight, targetLeft, targetMid];
	  this.obstacles = [obstacleRightVert, obstacleRightHighHoriz, obstacleEdgeVert, obstacleEdgeHoriz, obstacleRightLowHoriz];
	}

	LevelThree.prototype.draw = function () {
	  this.obstacles.forEach(function (obstacle) {
	    obstacle.draw();
	  });
	  this.targets.forEach(function (target) {
	    target.draw();
	  });
	};

	module.exports = LevelThree;

/***/ }
/******/ ]);