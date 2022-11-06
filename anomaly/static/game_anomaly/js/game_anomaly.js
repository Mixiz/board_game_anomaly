// размер поля, количество клеток
field_size = 10;
max_cycle = 100;
current_cycle = 0;
const CLASS_RED_DOT = 'red-dot';
red_dots = [];
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

// получить номер столбца, слева направо
function get_position_y(position) {
  var position_y;

  if (position < 4) {
    position_y = position+1;
  } else if (position < 7) {
    position_y = position-3;
  } else {
    position_y = position-6;
  }

  return position_y;
}

// получить номер строки, сверху вниз
function get_position_x(position) {
  var position_x;

  if (position < 4) {
    position_x = 1;
  } else if (position < 7) {
    position_x = 2;
  } else {
    position_x = 3;
  }

  return position_x;
}

// получить id ячейки по позиции
function resolve_cell_name(position_x, position_y) {
  var cell_name = 'location-'+position_x+'-'+position_y;
  return cell_name;
}

// рисует игрока на поле
function draw_player(player) {
  var cell_name = resolve_cell_name(player['position_x'], player['position_y']);

  $('#'+player['class']).remove();
  $('#'+cell_name).find('.player').append('<span id="'+player['class']+'" class="dot"></span>');
  $('#'+player['class']).attr('style', 'background-color: '+player['color']);
}

// рисует красные точки на поле
function draw_red_dot(red_dot) {
  var cell_name = resolve_cell_name(red_dot['position_x'], red_dot['position_y']);

  $('#'+cell_name).find('.location-contact').append('<span class="'+CLASS_RED_DOT+'"></span>');
}

function next_player() {
  init_player((current_player + 1) % players.length);
}

function prev_player() {
  init_player((current_player + players.length - 1) % players.length);
}

function check_cell_obstacles(new_position_x, new_position_y, objects_for_check = []) {
  var no_obstacles = true;
  objects_for_check.forEach(object => {
    if (object['position_x'] == new_position_x && object['position_y'] == new_position_y) {
      no_obstacles = false;
    }
  });
  return no_obstacles;
}

// проверяем, не уткнулся ли в край карты
function check_border(new_position_x, new_position_y) {
  var cell_exists = false;
  if ($('#'+resolve_cell_name(new_position_x, new_position_y)).length > 0) {
    cell_exists = true;
  }
  return cell_exists;
}

// при входе в локацию проверяем на возможные действия игрока
function check_cell_action(player, position_x, position_y) {
  // проверяем на красные точки
  if ($('#'+resolve_cell_name(position_x, position_y)).find('.'+CLASS_RED_DOT).length > 0) {
    player['score']++;
    for (var i = 0; i < red_dots.length; i++) {
      if (red_dots[i]['position_x'] == position_x && red_dots[i]['position_y'] == position_y) {
        red_dots.splice(i,1);
      }
    }
    $('#'+resolve_cell_name(position_x, position_y)).find('.'+CLASS_RED_DOT).remove();
  }

  if (check_win_condition()) {
    end_game();
  }
}

// пробуем сдвинуть маркер игрока, проверяем возможность и перерисовываем
function move_player(player, direction) {
  switch(direction) {
    case "left":
      new_position_x = player['position_x'];
      new_position_y = player['position_y'] - 1;
      break;
    case "right":
      new_position_x = player['position_x'];
      new_position_y = player['position_y'] + 1;
      break;
    case "up":
      new_position_x = player['position_x'] - 1;
      new_position_y = player['position_y'];
      break;
    case "down":
      new_position_x = player['position_x'] + 1;
      new_position_y = player['position_y'];
      break;
    default:
      return;
  }
  if (check_border(new_position_x, new_position_y) && check_cell_obstacles(new_position_x, new_position_y, players)) {
    player['position_x'] = new_position_x;
    player['position_y'] = new_position_y;
    draw_player(player);
    check_cell_action(player, new_position_x, new_position_y);
  }
}

function check_end_turn() {
  return true;
}

// Инициализация отображения для конкретного игрока
function init_player(player_num) {
  $('#person_icon').removeClass("class",players[current_player]["class"]);
  current_player = player_num;
  $('#person_icon').addClass("class",players[current_player]["class"]);
  $('#person_icon').parent().css("background-color", players[current_player]['color']);
}

// проверяет на условие победы
function check_win_condition() {
  var end_game = false;
  if (red_dots.length == 0) {
    end_game = true;
  }
  return end_game;
}

// заканчивает игру
function end_game() {
  // сортируем по уменьшению победных очков
  players.sort(function(a, b) {
    return b['score'] - a['score'];
  });
  $('#win-table').html('');
  $('#win-table').append('<table><tr><td>№<td>Игрок<td>Очки');

  for (var i = 0; i < players.length; i++) {
    $('#win-table').append('<tr><td>'+i+'<td><span class="player-icon '+players[i]['class']+'"></span><td>'+players[i]['score']);
  }

  $('#win-table').append('</table>');
  $('#win-window').show();
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

// инициализация полей
function init_fields() {
}

// подготовка игроков
function setup_players() {
  // Первый игрок по умолчанию
  $('#person_icon').parent().css("background-color", players[current_player]['color']);
  fill_counter(1);

  // данные об игроках, стартовые предметы и позиции
  players.forEach(player => {
    current_cycle = 0;
    while (player['position_x'] == undefined && current_cycle++ < max_cycle) {
      position = Math.floor(Math.random() * field_size);
      if (check_cell_obstacles(get_position_x(position), get_position_y(position), players)) {
        player['position_x'] = get_position_x(position);
        player['position_y'] = get_position_y(position);
      }
    }
    player['counter'] = 1;
    player['score'] = 0;
    draw_player(player);
  });
}

// подготовка объектов на поле
function init_game_objects() {
  // генерируем красные точки на поле
  var size = max_players + 1;
  while (red_dots.length < size) {
    var red_dot = {};
    current_cycle = 0;
    while (red_dot['position_x'] == undefined && current_cycle++ < max_cycle) {
      position = Math.floor(Math.random() * field_size);
      if (check_cell_obstacles(get_position_x(position), get_position_y(position), players.concat(red_dots))) {
        red_dot['position_x'] = get_position_x(position);
        red_dot['position_y'] = get_position_y(position);
      }
    }
    red_dots.push(red_dot);
    draw_red_dot(red_dot);
  }
}

// подготовка к старту
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
        move_player(players[current_player], key_codes[event.keyCode]);
      }
    });
});