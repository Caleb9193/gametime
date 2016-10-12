var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var blocks = [];

function Block(x, y, radius, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.height = 5;
  this.width = 5;
  this.radius = radius
  this.speedX = speedX;
  this.speedY = speedY;
}

Block.prototype.draw = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fill();
  return this;
};

Block.prototype.move = function () {
  if(this.x > canvas.width - this.width){
    this.speedX = -this.speedX
  }
  if(this.x < 0){
    this.speedX = -this.speedX
  }
  this.x += this.speedX

  if(this.y > canvas.height - this.height){
    this.speedY = -this.speedY
  }
  if(this.y < 0){
    this.speedY = -this.speedY
  }
  this.y += this.speedY
  return this;
};

canvas.addEventListener('click', function (thing) {
  var click = getClickPosition(thing);
  blocks.push(new Block(click.x, click.y, 5, 10, 10));
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) {
    block.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
