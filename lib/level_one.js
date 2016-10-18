var Obstacle = require('./obstacle');
var Target = require('./target');

function LevelOne(context){
  var obstacleMidHoriz = new Obstacle(550, 200, 200, 15, context);
  var targetMid = new Target(650, 150, context);
  this.context = context;
  this.ammo = 5;
  this.targets = [targetMid];
  this.obstacles = [obstacleMidHoriz];
}

LevelOne.prototype.draw = function(){
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.targets.forEach(function(target) { target.draw(); });
};

module.exports = LevelOne;
