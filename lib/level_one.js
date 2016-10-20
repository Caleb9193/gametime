var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelOne(context){
  this.context = context;
  this.number = 1;
  this.ammo = 4;
  this.remainingAmmo = 4;
  this.targets = createTargets(context);
  this.obstacles = createObstacles(context);
}

LevelOne.prototype.draw = function(){
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.targets.forEach(function(target) { target.draw(); });
};

function createTargets(context){ return [new Target(650, 150, context)];}
function createObstacles(context){ return [new Obstacle(550, 200, 200, 15, context)];}

module.exports = LevelOne;
