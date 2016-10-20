var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var $ = require('../assets/jquery.min');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Shooter = require('./shooter');
var shooter = new Shooter(context);
var Scoreboard = require('./scoreboard');
var scoreboard = new Scoreboard(context);
var LevelOne = require('./level_one');
var LevelTwo = require('./level_two');
var LevelThree = require('./level_three');

var bullets = [];

if (scoreboard.level === 1) {
  var currentLevel = new LevelOne(context);
}
function checkLevel(){
  if (scoreboard.level === 2) {
    currentLevel = new LevelTwo(context);
  } else if (scoreboard.level === 3) {
    currentLevel = new LevelThree(context);
  } else {
    setTimeout(function(){
      $('.game-canvas').hide();
      $('#welcome').show();
    }, 3000);
  }
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
  scoreboard.draw(currentLevel, bullets);
  currentLevel.draw();
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move(currentLevel);
    } else {
      bullets.shift();
    }
  });
  if (scoreboard.targetsLeft === 0){
    bullets = [];
    checkLevel();
    setTimeout(function() {requestAnimationFrame(gameLoop);}, 3000);
  } else {
    requestAnimationFrame(gameLoop);
  }
});
