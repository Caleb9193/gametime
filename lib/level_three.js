var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelThree(context){
  var obstacleRightVert = new Obstacle(955, 370, 20, 30, context);
  var obstacleRightHighHoriz = new Obstacle(875, 300, 50, 20, context);
  var obstacleRightLowHoriz = new Obstacle(875, 400, 100, 20, context);
  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
  var targetRight = new Target(855, 250, context);
  var targetLeft = new Target(0, 150, context);
  var targetMid = new Target(900, 350, context);
  this.context = context;
  this.number = 3;
  this.ammo = 6;
  this.remainingAmmo = 6;
  this.targets = [targetRight, targetLeft, targetMid];
  this.obstacles = [obstacleRightVert, obstacleRightHighHoriz, obstacleEdgeVert, obstacleEdgeHoriz, obstacleRightLowHoriz];
}

LevelThree.prototype.draw = function(){
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.targets.forEach(function(target) { target.draw(); });
};

module.exports = LevelThree;
