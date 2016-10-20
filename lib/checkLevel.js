module.exports = function(game) {
  if(game.scoreboard.targetsLeft===0 && game.currentLevel.number===game.finalLevel) {
    game.bullets = [];
    return 1;
  } else if(game.scoreboard.targetsLeft===0) {
    game.bullets = [];
    return 2;
  } else if(game.currentLevel.remainingAmmo===0 && game.bullets.length===0) {
    return 3;
  }
};
