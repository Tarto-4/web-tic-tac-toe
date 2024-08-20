document.getElementById('login').addEventListener('click', () => {
    document.getElementById('login-form').classList.toggle('hidden');
});

document.getElementById('submit-login').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('game-board').classList.remove('hidden');
        document.getElementById('reset').classList.remove('hidden');
        socket.emit('login', { username });
    }
});

document.getElementById('leaderboard').addEventListener('click', () => {
    document.getElementById('leaderboard-section').classList.toggle('hidden');
    socket.emit('getLeaderboard');
});

socket.on('updateLeaderboard', (leaderboard) => {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    leaderboard.forEach(entry => {
        const item = document.createElement('li');
        item.textContent = `${entry.username}: ${entry.wins} Wins`;
        list.appendChild(item);
    });
});

