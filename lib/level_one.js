var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelOne(context){
  var obstacleMidVert = new Obstacle(350, 100, 20, 200, context);
  var obstacleMidHoriz = new Obstacle(550, 200, 200, 15, context);
  var obstacleEdgeVert = new Obstacle(850, 300, 25, 200, context);
  var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 15, context);
  var targetRight = new Target(855, 250, context);
  var targetLeft = new Target(0, 150, context);
  var targetMid = new Target(650, 150, context);
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
