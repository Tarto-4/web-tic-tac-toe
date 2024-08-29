import Fireworks from 'fireworks-js';
const socket = io();

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

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
        socket.emit('make_move', { position: index });
    }
}

socket.on('update_board', (game_state) => {
    game_state.board.forEach((value, index) => {
        const cell = cells[index];
        cell.textContent = value;
        cell.classList.remove('x', 'o');
        if (value === 'X') {
            cell.classList.add('x');
        } else if (value === 'O') {
            cell.classList.add('o');
        }
    });
    if (game_state.winner) {
        status.textContent = game_state.winner === 'Draw' ? 'It\'s a Draw!' : `${game_state.winner} Wins!`;
        if (game_state.winner !== 'Draw') {
            startFireworks();
        }
    } else {
        status.textContent = `Current Turn: ${game_state.current_turn}`;
    }
    scoreX.textContent = game_state.scoreboard.X;
    scoreO.textContent = game_state.scoreboard.O;
});

function startFireworks() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const fireworks = new Fireworks(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 15,
            max: 30
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });

    fireworks.start();

    setTimeout(() => {
        fireworks.stop();
        document.body.removeChild(container);
    }, 5000); // Fireworks duration
}

let currentPlayer = 'X';