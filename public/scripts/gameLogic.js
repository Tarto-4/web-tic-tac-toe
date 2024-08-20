const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset');
const socket = io();

// Initialize game board
const createBoard = () => {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }
};

createBoard();

// Game state
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Handle cell click
board.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (gameState[index] === '') {
        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        socket.emit('playerMove', { index, player: currentPlayer });
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});

// Check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`${gameState[a]} wins!`);
            socket.emit('gameOver', { winner: gameState[a] });
            resetGame();
            return;
        }
    }
    
    if (!gameState.includes('')) {
        alert('Draw!');
        socket.emit('gameOver', { winner: 'Draw' });
        resetGame();
    }
};

// Reset game
const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    createBoard();
    socket.emit('resetGame');
};

resetButton.addEventListener('click', resetGame);

