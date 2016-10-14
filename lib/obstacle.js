function Obstacle(x, y, height, width, context) {
  this.x = 0;
  this.y = 250;
  this.height = 10;
  this.width = 300;
  this.context = context;
}

Obstacle.prototype.draw = function () {
  this.context.fillStyle = "black";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Obstacle;
