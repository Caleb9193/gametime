var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Scoreboard = require('./scoreboard');
var LevelOne = require('./level_one');
var LevelTwo = require('./level_two');
var LevelThree = require('./level_three');

function Game(context) {
  this.currentLevel = new LevelOne(context);
  this.finalLevel = 3;
  this.bullets = [];
  this.scoreboard = new Scoreboard(context, this.currentLevel);
  this.gameOver = false;
  this.context = context;
  this.canvas = context.canvas;
}

this.canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  var angleRadians = Math.atan2(click.y - 470, click.x - 80);
  var directionX = Math.cos(angleRadians) * 14;
  var directionY = Math.sin(angleRadians) * 14;

  if (this.currentLevel.ammo > 0 && this.scoreboard.targetsLeft > 0) {
    this.bullets.push(new Bullet(directionX, directionY, context));
    this.currentLevel.ammo--;
  }
});

Game.prototype.checkLevel = function() {
  if (this.scoreboard.level === 2) {
    this.currentLevel = new LevelTwo(context);
  } else if (this.scoreboard.level === 3) {
    this.currentLevel = new LevelThree(context);
  } else if (this.scoreboard.level > this.finalLevel) {
    this.gameOver = true;
  }
};

module.exports = Game;
