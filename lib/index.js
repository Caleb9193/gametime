var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Shooter = require('./shooter');
var shooter = new Shooter(context);
var Scoreboard = require('./scoreboard');
var scoreboard = new Scoreboard(context);
var LevelOne = require('./level_one');
var LevelTwo = require('./level_two');

var bullets = [];
var level = 1;

if (level === 1) {
  var currentLevel = new LevelOne(context);
} else if (level === 2) {
  var currentLevel = new LevelTwo(context);
}



canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  var angleRadians = Math.atan2(click.y - 470, click.x - 80);
  var directionX = Math.cos(angleRadians) * 14;
  var directionY = Math.sin(angleRadians) * 14;

  if (currentLevel.ammo > 0 && scoreboard.targetsLeft > 0) {
    bullets.push(new Bullet(directionX, directionY, context));
    currentLevel.ammo--;
  }
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  currentLevel.draw();
  scoreboard.draw(currentLevel, bullets);
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move(currentLevel);
    } else {
      bullets.shift();
    }
  });

  requestAnimationFrame(gameLoop);
});
