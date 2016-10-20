var checkLevel = require('./checkLevel');

function Scoreboard(context) {
  this.targetsLeft = 0;
  this.levelScore = 0;
  this.gameScore = 0;
  this.context = context;
}


Scoreboard.prototype.draw = function (game) {
  this.trackTargets(game.currentLevel);
  this.score(game);
};


Scoreboard.prototype.trackTargets = function(currentLevel) {
  var count = 0;
  currentLevel.targets.forEach(function(target) {
    if (!target.display) { count++; }
  });

  this.targetsLeft = currentLevel.targets.length - count;
};


Scoreboard.prototype.score = function (game) {
  switch (checkLevel(game)) {
    case 1: // if level & game won
      this.calculateScores(game.currentLevel.remainingAmmo);
      gameWinText(this);
      localStorage.scores = localStorage.scores + ',' + this.gameScore.toString();
      game.gameOver = true;
      break;
    case 2: // if level only won
      this.calculateScores(game.currentLevel.remainingAmmo);
      levelWinText(this);
      game.levelWon = true;
      break;
    case 3: // if level lost
      levelLoseText(this);
      game.levelLost = true;
      break;
    default: // game is in progress
      gameText(game.currentLevel.remainingAmmo, this);
  }

  return this;
};


Scoreboard.prototype.calculateScores = function (ammo) {
  this.levelScore = 100 + ammo*100;
  this.gameScore += this.levelScore;

  return this;
};


function gameWinText(scoreboard) {
  scoreboard.context.font="35px Verdana";
  scoreboard.context.fillStyle = "white";
  scoreboard.context.textAlign="center";
  scoreboard.context.fillText("Score: " + scoreboard.levelScore + " | Total Score: " + scoreboard.gameScore, scoreboard.context.canvas.width/2, 250);

  return scoreboard;
}


function levelWinText(scoreboard) {
  scoreboard.context.font="35px Verdana";
  scoreboard.context.fillStyle = "white";
  scoreboard.context.textAlign="center";
  scoreboard.context.fillText("Score: " + scoreboard.levelScore, scoreboard.context.canvas.width/2, 60);

  return scoreboard;
}


function levelLoseText(scoreboard) {
  scoreboard.context.font="40px Verdana";
  scoreboard.context.fillStyle = "#6b111b";
  scoreboard.context.textAlign="center";
  scoreboard.context.fillText("YOU RAN OUT OF AMMO. PLEASE TRY AGAIN.", scoreboard.context.canvas.width/2, 60);

  return scoreboard;
}


function gameText(ammo, scoreboard) {
  scoreboard.context.font="14px Verdana";
  scoreboard.context.fillStyle = "white";
  scoreboard.context.beginPath();
  scoreboard.context.textAlign="left";
  scoreboard.context.fillText("Targets Remaining: " + scoreboard.targetsLeft, 10, 20);
  scoreboard.context.closePath();
  scoreboard.context.beginPath();
  scoreboard.context.textAlign="right";
  scoreboard.context.fillText("Shots Remaining: " + ammo, 1090, 20);

  return scoreboard;
}

module.exports = Scoreboard;
