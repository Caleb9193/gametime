var $ = require('../assets/jquery.min');
require('./game');

$('.game-canvas').hide();

$(document).ready(function() {
  $('#start-game-btn').on('click', function() {
    $('#welcome').hide();
    $('.game-canvas').show();
  });
});
