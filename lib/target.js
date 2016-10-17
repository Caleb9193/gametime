function Target(x, y, context) {
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 50;
  this.context = context;
  this.display = true;
}

Target.prototype.draw = function () {
  if(this.display) {
    var img = new Image();
    img.src = 'http://i.imgur.com/G1LkGk2.png';
    this.context.drawImage(img, this.x, this.y, this.width, this.height);
  }
};

module.exports = Target;
