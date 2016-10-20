var Scoreboard = require('./scoreboard');
var LevelOne = require('./level_one');
var LevelTwo = require('./level_two');
var LevelThree = require('./level_three');
if (!localStorage.scores){
  localStorage.scores = '';
}


function Game(context) {
  this.currentLevel = new LevelOne(context);
  this.finalLevel = 3;
  this.scoreboard = new Scoreboard(context);
  this.bullets = [];
  this.levelWon = false;
  this.levelLost = false;
  this.gameOver = false;
  this.context = context;
}

Game.prototype.updateLevel = function() {
  if (this.currentLevel.number === 1) {
    this.currentLevel = new LevelTwo(this.context);
  } else if (this.currentLevel.number === 2) {
    this.currentLevel = new LevelThree(this.context);
  } else if (this.currentLevel.number === 3) {
    this.gameOver = true;
  }
  this.levelWon = false;
};

Game.prototype.retryLevel = function() {
  this.currentLevel.remainingAmmo = this.currentLevel.ammo;
  this.currentLevel.targets.forEach(function(target) {
    target.display = true;
  });
  this.levelLost = false;

  return this;
};

module.exports = Game;
