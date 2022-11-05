// Здесь находятся основные функции, которые будут использоваться в течение игры, как общение с сервером, порядок ходов, отображение

// Глобальные переменные для игры
var players = [];
var current_player = 0;
var max_players;

// Проверка, что ход можно передать следующему игроку
function next_move() {
    if (check_end_turn()) {
        current_player = (current_player+1) % players.length;
        init_player(current_player);
    }
}

// Инициализация игры
function setup() {
    init_data();
    // инициализация игрового поля
    init_fields();
    // подготовка игроков
    setup_players();
    // подготовка к старту
    set_start();
}

