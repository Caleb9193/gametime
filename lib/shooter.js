function Shooter(context) {
  // this.x = 70;
  // this.y = 450;
  // this.height = 50;
  // this.width = 10;
  this.context = context;
}

Shooter.prototype.draw = function () {
  var img = new Image();
  img.src = 'http://i.imgur.com/sojxivK.png';
  this.context.drawImage(img, 70, 450);

  // this.context.fillStyle = "#e1ecf6";
  // this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Shooter;
