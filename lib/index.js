var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Shooter = require('./shooter');
var shooter = new Shooter(context);
var LevelOne = require('./level_one');

var bullets = [];
var ammo = 5;
var level = 1;

if (level === 1) { var currentLevel = new LevelOne(context); }


canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  var angleRadians = Math.atan2(click.y - 450, click.x - 70);
  var directionX = Math.cos(angleRadians) * 13;
  var directionY = Math.sin(angleRadians) * 13;

  if (bullets.length === 0 && ammo > 0) {
    bullets.push(new Bullet(directionX, directionY, context));
    ammo--;
  }
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  currentLevel.draw();
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move(currentLevel);
    } else {
      bullets.shift();
    }
  });

  requestAnimationFrame(gameLoop);
});
