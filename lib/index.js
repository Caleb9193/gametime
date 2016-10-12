var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');

var Shooter = require('./shooter');
var shooter = new Shooter(context);

var bullets = [];

canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  bullets.push(new Bullet(75, 450, 4, 20, 20, context, canvas));
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  bullets.forEach(function (bullet) {
    bullet.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
