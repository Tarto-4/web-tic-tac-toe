const socket = io();

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', () => {
    socket.emit('reset_game');
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-cell');
    if (cell.textContent === '') {
        socket.emit('make_move', { index: index, player: currentPlayer });
    }
}

socket.on('move_made', data => {
    const cell = cells[data.index];
    cell.textContent = data.player;
    currentPlayer = data.nextPlayer;
});

socket.on('game_over', data => {
    alert(data.message);
    resetBoard();
});

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}