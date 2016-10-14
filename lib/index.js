var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Obstacle = require('./obstacle');
var obstacle = new Obstacle(0, 250, 10, 300, context);

var Shooter = require('./shooter');
var shooter = new Shooter(context);

var bullets = [];
var ammo = 5;


canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);

  var angleRadians = Math.atan2(click.y - 450, click.x - 70);
  var directionX = Math.cos(angleRadians) * 20;
  var directionY = Math.sin(angleRadians) * 20;

  if (bullets.length === 0 && ammo > 0) {
    bullets.push(new Bullet(directionX, directionY, context));
    ammo--;
  }
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  obstacle.draw();
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move(obstacle);
    } else {
      bullets.shift();
    }
  });
  requestAnimationFrame(gameLoop);
});
