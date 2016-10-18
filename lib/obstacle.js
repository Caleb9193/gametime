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
