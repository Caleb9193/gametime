var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelOne(context){
  var obstacleMidVert = new Obstacle(350, 100, 10, 200, context);
  var obstacleMidHoriz = new Obstacle(550, 200, 200, 10, context);
  var obstacleEdgeVert = new Obstacle(850, 300, 10, 200, context);
  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 10, context);
  var targetRight = new Target(1093, 100, 7, 50, context);
  var targetLeft = new Target(0, 90, 7, 50, context);
  var targetMid = new Target(650, 150, 7, 50, context);
  this.context = context;
  this.score = 0;
  this.targets = [targetRight, targetLeft, targetMid];
  this.obstacles = [obstacleMidVert, obstacleMidHoriz, obstacleEdgeVert, obstacleEdgeHoriz];
}

LevelOne.prototype.draw = function(){
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.targets.forEach(function(target) { target.draw(); });
};

module.exports = LevelOne;
