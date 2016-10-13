function Bullet(context) {
  this.x = 75;
  this.y = 450;
  this.height = 3;
  this.width = 3;
  this.radius = 4;
  this.speedX = 15;
  this.speedY = 15;
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

Bullet.prototype.move = function () {
  if(this.x > this.context.canvas.width - this.width){
    this.speedX = -this.speedX;
    this.bounceCount++;
  }
  if(this.x < 0){
    this.speedX = -this.speedX;
    this.bounceCount++;
  }
  this.x += this.speedX;

  if(this.y > this.context.canvas.height - this.height){
    this.speedY = -this.speedY;
    this.bounceCount++;
  }
  if(this.y < 0){
    this.speedY = -this.speedY;
    this.bounceCount++;
  }
  this.y += this.speedY;
  return this;
};

module.exports = Bullet;
