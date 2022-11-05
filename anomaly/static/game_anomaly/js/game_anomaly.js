// размер поля, количество клеток
field_size = 10;
key_codes = {37:'left', 39:'right', 38:'up', 40:'down'}

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

// рисует игрока на поле
function draw_player(player) {
  if (player['position'] < 4) {
    cell_name = 'location-1-'+(player['position']+1);
  } else if (player['position'] < 7) {
    cell_name = 'location-2-'+(player['position']-3);
  } else {
    cell_name = 'location-3-'+(player['position']-6);
  }

  $('#'+player['class']).remove();
  $('#'+cell_name).find('.player').append('<span id="'+player['class']+'" class="dot"></span>');
  $('#'+player['class']).attr('style', 'background-color: '+player['color']);
}

function next_player() {
  init_player((current_player + 1) % players.length);
}

function prev_player() {
  init_player((current_player + players.length - 1) % players.length);
}

// пробуем сдвинуть маркер игрока, проверяем возможность и перерисовываем
function move_player(direction) {
  switch(direction) {
    case "left":
      break;
    case "right":
      break;
    case "up":
      break;
    case "down":
      break;
    default:
      break;
  }
}

function check_end_turn() {
  return true;
}

// Инициализация игровых данных
// Количество игроков, данные о них
function init_data() {
  max_players = 4;
  players = [
    {'class': 'doctor', 'moves_left': 0, 'color': 'blue'},
    {'class': 'soldier', 'moves_left': 0, 'color': 'red'},
    {'class': 'scientist', 'moves_left': 0, 'color': 'green'},
    {'class': 'merchant', 'moves_left': 0, 'color': 'yellow'}
  ];
}

function init_fields() {
}

function setup_players() {
  // Первый игрок по умолчанию
  $('#person_icon').parent().css("background-color", players[current_player]['color']);
  fill_counter(1);

  // данные об игроках, стартовые предметы и позиции
  players.forEach(player => {
    player['position'] = Math.floor(Math.random() * field_size);
    draw_player(player);
  });
}

// Инициализация отображения для конкретного игрока
function init_player(player_num) {
  $('#person_icon').removeClass("class",players[current_player]["class"]);
  current_player = player_num;
  $('#person_icon').addClass("class",players[current_player]["class"]);
  $('#person_icon').parent().css("background-color", players[current_player]['color']);
}

function set_start() {
}

// Документ готов, можно инициализировать
$(document).ready(function() {
    setup();
    addEventListener('keydown', (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (key_codes[event.keyCode]) {
        move(key_codes[event.keyCode]);
      }
    });
});