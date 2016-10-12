function Bullet(x, y, radius, speedX, speedY, context) {
  this.x = x;
  this.y = y;
  this.height = 3;
  this.width = 3;
  this.radius = radius;
  this.speedX = speedX;
  this.speedY = speedY;
  this.context = context;
}

Bullet.prototype.draw = function () {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  this.context.fillStyle = "#000000";
  this.context.fill();
  return this;
};

Bullet.prototype.move = function () {
  if(this.x > this.context.canvas.width - this.width){
    this.speedX = -this.speedX;
  }
  if(this.x < 0){
    this.speedX = -this.speedX;
  }
  this.x += this.speedX;

  if(this.y > this.context.canvas.height - this.height){
    this.speedY = -this.speedY;
  }
  if(this.y < 0){
    this.speedY = -this.speedY;
  }
  this.y += this.speedY;
  return this;
};

module.exports = Bullet;
