var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');

var bullets = [];

canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  bullets.push(new Bullet(click.x, click.y, 4, 20, 20));
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bullets.forEach(function (bullet) {
    bullet.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
