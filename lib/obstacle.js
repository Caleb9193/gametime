function Obstacle(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

Obstacle.prototype.draw = function () {
  this.context.fillStyle = "black";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Obstacle;
