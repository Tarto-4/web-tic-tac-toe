const socket = io();

// Handle player moves from server
socket.on('playerMove', ({ index, player }) => {
    const cell = board.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
});

// Handle game reset from server
socket.on('resetGame', () => {
    resetGame();
});

// Handle game over from server
socket.on('gameOver', ({ winner }) => {
    if (winner !== 'Draw') {
        alert(`${winner} wins!`);
    } else {
        alert('Draw!');
    }
});

