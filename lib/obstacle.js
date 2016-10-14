function Obstacle(x, y, height, width, context) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.context = context;
}

Obstacle.prototype.draw = function () {
  this.context.fillStyle = "black";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Obstacle;
