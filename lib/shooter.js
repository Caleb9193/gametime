function Shooter(context) {
  this.x = 70;
  this.y = 450;
  this.height = 50;
  this.width = 10;
  this.context = context;
}

Shooter.prototype.draw = function () {
  this.context.fillStyle = "#686868";
  this.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Shooter;
