function Bullet(directionX, directionY, context) {
  this.x = 75;
  this.y = 450;
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
  this.context.fillStyle = "#000000";
  this.context.fill();
  return this;
};

Bullet.prototype.move = function (obstacle) {
  if(this.x > this.context.canvas.width - this.width){
    this.directionX = -this.directionX;
    this.bounceCount++;
  }
  if(this.x < 0){
    this.directionX = -this.directionX;
    this.bounceCount++;
  }
  if(obstacle.height > 10 && this.x > obstacle.x - obstacle.width && this.x < obstacle.x + obstacle.width * 2 && this.y >= obstacle.y && this.y < obstacle.y + obstacle.height && obstacle.y > 0){
    this.directionX = -this.directionX;
    this.bounceCount++;
  }
  if(obstacle.height > 10 && this.x > obstacle.x - obstacle.width && this.x < obstacle.x + obstacle.width * 2 && obstacle.y === 0 && this.y < obstacle.height){
    this.directionX = -this.directionX;
    this.bounceCount++;
  }
  this.x += this.directionX;

  if(this.y > this.context.canvas.height - this.height){
    this.directionY = -this.directionY;
    this.bounceCount++;
  }
  if(this.y < 0){
    this.directionY = -this.directionY;
    this.bounceCount++;
  }
  if(this.y > obstacle.y - obstacle.height * 2 && this.y <= obstacle.y + obstacle.height && obstacle.x === 0 && this.x <= obstacle.width && obstacle.height <= 10){
    this.directionY = -this.directionY;
    this.bounceCount++;
  }

  if(this.y > obstacle.y - obstacle.height * 2 && this.y <= obstacle.y + obstacle.height && obstacle.x > 0 && this.x >= obstacle.x && this.x < obstacle.x + obstacle.width && obstacle.height <= 10){
    this.directionY = -this.directionY;
    this.bounceCount++;
  }
  this.y += this.directionY;
  return this;
};

module.exports = Bullet;
