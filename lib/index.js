var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var getClickPosition = require('./helpers');
var Bullet = require('./bullet');
var Shooter = require('./shooter');
var shooter = new Shooter(context);

var Obstacle = require('./obstacle');
var obstacleMidVert = new Obstacle(350, 100, 10, 200, context);
var obstacleMidHoriz = new Obstacle(550, 200, 200, 10, context);
var obstacleEdgeVert = new Obstacle(850, 300, 10, 200, context);
var obstacleEdgeHoriz = new Obstacle(0, 200, 200, 10, context);
var obstacles = [obstacleMidVert, obstacleMidHoriz, obstacleEdgeVert, obstacleEdgeHoriz];

var Target = require('./target');
var targetRight = new Target(1093, 100, 7, 50, context);
var targetLeft = new Target(0, 100, 7, 50, context);
var targetMid = new Target(650, 150, 7, 50, context);
var targets = [targetRight, targetLeft, targetMid];

var bullets = [];
var ammo = 5;


canvas.addEventListener('click', function (target) {
  var click = getClickPosition(target);
  var angleRadians = Math.atan2(click.y - 450, click.x - 70);
  var directionX = Math.cos(angleRadians) * 13;
  var directionY = Math.sin(angleRadians) * 13;

  if (bullets.length === 0 && ammo > 0) {
    bullets.push(new Bullet(directionX, directionY, context));
    ammo--;
  }
});

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  shooter.draw();
  obstacles.forEach(function(obstacle) { obstacle.draw(); });
  targets.forEach(function(target) { target.draw(); });
  bullets.forEach(function (bullet) {
    if (bullet.bounceCount < 8) {
      bullet.draw().move(obstacles, targets);
    } else {
      bullets.shift();
    }
  });

  requestAnimationFrame(gameLoop);
});
