var $ = require('../assets/jquery.min');
require('./game');

$('.game-canvas').hide();
$('#instructions').hide();

$(document).ready(function() {
  $('#start-game-btn').on('click', function() {
    $('#welcome').hide();
    $('#instructions').show('slow');
    $('.game-canvas').show('slow');
  });
});
