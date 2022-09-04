function fill_counter(count) {
  var color;
  if (count == 1) {
    color = 'green';
  } else if (count == 2) {
    color = 'yellow';
  } else if (count == 3) {
    color = 'red';
  }

  for (var i=1;i <= 3; i++) {
    if (i <= count)
      $('#counter-'+i).css('background-color', color);
    else
      $('#counter-'+i).css('background-color', '');
  }
}

function check_end_turn() {
  return true;
}

function init_fields() {
}

function setup_players() {
  // Первый игрок по умолчанию
  $('#person_icon').attr("class","doctor");
  $('#counter-1').css('background-color', 'green');
}

function set_start() {
}

// Документ готов, можно инициализировать
$(document).ready(function() {
    setup();
});