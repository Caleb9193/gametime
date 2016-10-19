function Shooter(context) {
  this.context = context;
}

Shooter.prototype.draw = function () {
  var img = new Image();
  img.src = 'http://i.imgur.com/sojxivK.png';
  this.context.drawImage(img, 70, 450);
};

module.exports = Shooter;
