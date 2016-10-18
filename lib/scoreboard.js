function Scoreboard(context, level) {
  this.targetsLeft = 0;
  this.context = context;
  this.level = level;
}


Scoreboard.prototype.draw = function (currentLevel, bullets) {
  this.score(currentLevel);
  this.getText(currentLevel, bullets);
};


Scoreboard.prototype.score = function(currentLevel) {
  var killCount = 0;

  currentLevel.targets.forEach(function(target) {
    if (!target.display) { killCount++; }
  });

  this.targetsLeft = currentLevel.targets.length - killCount;
};


Scoreboard.prototype.getText = function (currentLevel, bullets) {
  if(this.targetsLeft === 0) {
    // if game won
    gameWinText(currentLevel, this);
    this.level += 1;
  } else if(currentLevel.ammo === 0 && bullets.length === 0) {
    // if game lost
    gameLoseText(currentLevel, this);
  } else {
    // if game in progress
    gameText(currentLevel, this);
  }

  return this;
};



function gameWinText(currentLevel, that) {
  that.context.font="35px Verdana";
  that.context.fillStyle = "white";
  that.context.textAlign="center";
  that.context.fillText("Score: " + (100 + currentLevel.ammo*100), that.context.canvas.width/2, 60);

  return that;
}


function gameLoseText(currentLevel, that) {
  that.context.font="40px Verdana";
  that.context.fillStyle = "#6b111b";
  that.context.textAlign="center";
  that.context.fillText("YOU RAN OUT OF AMMO. PLEASE TRY AGAIN.", that.context.canvas.width/2, 60);

  return that;
}


function gameText(currentLevel, that) {
  that.context.font="14px Verdana";
  that.context.fillStyle = "white";
  that.context.beginPath();
  that.context.textAlign="left";
  that.context.fillText("Targets Remaining: " + that.targetsLeft, 10, 20);
  that.context.closePath();

  that.context.beginPath();
  that.context.textAlign="right";
  that.context.fillText("Shots Remaining: " + currentLevel.ammo, 1090, 20);

  return that;
}

module.exports = Scoreboard;
