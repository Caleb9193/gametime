var $ = require('../assets/jquery.min');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Game = require('./game');
var Shooter = require('./shooter');

$('.game-canvas').hide();

$(document).ready(function() {
  $('#start-game-btn').on('click', function() {
    $('#welcome').hide();
    $('.game-canvas').show(function() {
      var shooter = new Shooter(context);
      var game = new Game(context);
      var totalScore = 0;

      requestAnimationFrame(startLoop);

      function startLoop() {
        shooter = new Shooter(context);
        game = new Game(context);
        totalScore = 0;
        requestAnimationFrame(gameLoop);
      }

      function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        shooter.draw();
        game.scoreboard.draw(game.currentLevel, game.bullets);
        game.currentLevel.draw();
        game.bullets.forEach(function (bullet) {
          if (bullet.bounceCount < 8) {
            bullet.draw().move(game.currentLevel);
          } else {
            game.bullets.shift();
          }
        });
        if (game.scoreboard.targetsLeft === 0) {
          game.checkLevel();
          setTimeout(function() {requestAnimationFrame(gameLoop);}, 3000);
        } else {
          requestAnimationFrame(gameLoop);
        }
      }
    });
  });
});
