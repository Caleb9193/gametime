var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelFour(context){
  this.context = context;
  this.number = 4;
  this.ammo = 7;
  this.remainingAmmo = 7;
  this.targets = createTargets(context);
  this.obstacles = createObstacles(context);
}

function createObstacles(context){return [new Obstacle(910, 300, 200, 25, context), new Obstacle(840, 380, 50, 15, context), new Obstacle(740, 390, 50, 15, context), new Obstacle(640, 400, 50, 15, context), new Obstacle(911, 365, 25, 140, context), new Obstacle(450, 0, 15, 150, context), new Obstacle(350, 135, 200, 20, context), new Obstacle(350, 95, 20, 60, context)];}

function createTargets(context){return [new Target(855, 330, context), new Target(420, 85, context), new Target(480, 85, context), new Target(755, 340, context), new Target(655, 350, context), new Target(1070, 450, context)];}

LevelFour.prototype.draw = function(){
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.targets.forEach(function(target) { target.draw(); });
};

module.exports = LevelFour;
