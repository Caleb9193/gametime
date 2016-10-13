var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');

var Shooter = require('./shooter');
var shooter = new Shooter(context);

var bullets = [];

canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  bullets.push(new Bullet(4, 5, 5, context));
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move();
    } else {
      bullets.shift();
    }
  });
  requestAnimationFrame(gameLoop);
});
