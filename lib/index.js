var $ = require('../assets/jquery.min');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var getClickPosition = require('./helpers');
var Game = require('./game');
var Shooter = require('./shooter');
var Bullet = require('./bullet');

$(document).ready(function() {
  checkScores();

  $('#start-game-btn').on('click', function() {
    $('#welcome').hide();
    $('#instructions').css('display', 'block');
    $('.game-canvas').css('display', 'block');
    var game = new Game(context);
    var shooter = new Shooter(context);

    requestAnimationFrame(startLoop);

    function startLoop() {
      shooter = new Shooter(context);
      game = new Game(context);
      requestAnimationFrame(gameLoop);
    }

    function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      shooter.draw();
      game.scoreboard.draw(game);
      game.currentLevel.draw();
      game.bullets.forEach(function (bullet) {
        bullet.draw(game).move(game.currentLevel);
      });
      if (game.gameOver) {
        $('#restart-game').css('display', 'block');
      } else if(game.levelLost) {
        game.retryLevel();
        setTimeout(function() {requestAnimationFrame(gameLoop);}, 3000);
      } else if(game.levelWon) {
        game.updateLevel();
        setTimeout(function() {requestAnimationFrame(gameLoop);}, 3000);
      } else {
        requestAnimationFrame(gameLoop);
      }
    }

    canvas.addEventListener('click', function (target) {
      var click = getClickPosition(target);
      var angleRadians = Math.atan2(click.y - 470, click.x - 80);
      var directionX = Math.cos(angleRadians) * 14;
      var directionY = Math.sin(angleRadians) * 14;

      if (game.currentLevel.remainingAmmo > 0) {
        game.bullets.push(new Bullet(directionX, directionY, context));
        game.currentLevel.remainingAmmo--;
      }
    });

    $('#restart-game-btn').on('click', function() {
      $('#restart-game').hide();
      requestAnimationFrame(startLoop);
    });
  });
});

function checkScores(){
  var scores = localStorage.scores.split(',').splice(1).sort().reverse();
  if (scores.length < 3) {
    scores[1] = '';
    scores[2] = '';
  }

  if (localStorage.scores !== '') {
    for (var i = 0; i <= 2; i++) {
        $('#scores').append('<li class="score">'+ scores[i] + '</li>');
    }
  } else {
    $('#scores').append('<p>No scores yet</p>');
  }
}
