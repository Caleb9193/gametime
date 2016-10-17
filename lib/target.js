function Target(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.display = true;
}

Target.prototype.draw = function () {
  if(this.display) {
    this.context.fillStyle = "red";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
};

module.exports = Target;
