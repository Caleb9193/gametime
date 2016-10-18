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
  if(posX >= this.context.canvas.width || posX <= this.radius) {
    this.directionX *= -1;
    this.bounceCount++;
  }

  // check collision with top & bottom canvas borders
  if(posY >= this.context.canvas.height || posY <= this.radius) {
    this.directionY *= -1;
    this.bounceCount++;
  }

  // check collision with obstacles
  obstacles.forEach(function (obstacle) {
    if(posX >= obstacle.x &&
        this.x - this.radius <= obstacle.x + obstacle.width &&
        posY >= obstacle.y &&
        this.y - this.radius <= obstacle.y + obstacle.height) {
      this.changeDirection(obstacle);
      this.bounceCount++;
    }
  }, this);

  // check collision with targets
  targets.forEach(function (target) {
    if(posX >= target.x &&
        this.x - this.radius <= target.x + target.width &&
        posY >= target.y &&
        this.y - this.radius <= target.y + target.height) {
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
  if(this.checkDirectionX(obstacle.x, obstacleRight, previousX)) {
    this.directionX *= -1;
  }

  // change Y direction
  if(this.checkDirectionY(obstacle.y, obstacleBottom, previousY)) {
    this.directionY *= -1;
  }
};


Bullet.prototype.checkDirectionX = function (obstacleLeft, obstacleRight, previousX) {
  // check if collision on right side
  return (obstacleRight < previousX - this.radius && obstacleRight >= this.x - this.radius) ||
  // check if collision on left side
  (obstacleLeft > previousX + this.radius && obstacleLeft <= this.x + this.radius);
};


Bullet.prototype.checkDirectionY = function (obstacleTop, obstacleBottom, previousY) {
  // check if collision on bottom side
  return (obstacleBottom < previousY - this.radius && obstacleBottom >= this.y - this.radius) ||
  // check if collision on top side
  (obstacleTop > previousY + this.radius && obstacleTop <= this.y + this.radius);
};

module.exports = Bullet;
