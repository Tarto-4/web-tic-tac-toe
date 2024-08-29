from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import random

app = Flask(__name__)
socketio = SocketIO(app)
from flask_socketio import SocketIO, emit
import random

app = Flask(__name__)
socketio = SocketIO(app)

# Game state
game_state = {
    'board': [''] * 9,
    'current_turn': 'X',
    'winner': None,
    'scoreboard': {'X': 0, 'O': 0}
}

def check_winner(board):
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
        [0, 4, 8], [2, 4, 6]              # Diagonals
    ]
    for combo in winning_combinations:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] and board[combo[0]] != '':
            return board[combo[0]]
    if '' not in board:
        return 'Draw'
    return None

def computer_move(board):
    available_moves = [i for i, cell in enumerate(board) if cell == '']
    return random.choice(available_moves)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('make_move')
def handle_make_move(data):
    position = int(data['position'])
    if game_state['board'][position] == '' and game_state['winner'] is None:
        game_state['board'][position] = 'X'
        game_state['winner'] = check_winner(game_state['board'])
        if game_state['winner'] is None:
            computer_position = computer_move(game_state['board'])
            game_state['board'][computer_position] = 'O'
            game_state['winner'] = check_winner(game_state['board'])
        if game_state['winner']:
            if game_state['winner'] != 'Draw':
                game_state['scoreboard'][game_state['winner']] += 1
        game_state['current_turn'] = 'X' if game_state['current_turn'] == 'O' else 'O'
        emit('update_board', game_state, broadcast=True)

@socketio.on('reset_game')
def handle_reset_game():
    game_state['board'] = [''] * 9
    game_state['current_turn'] = 'X'
    game_state['winner'] = None
    emit('update_board', game_state, broadcast=True)

if __name__ == '__main__':
	socketio.run(app, debug=True)

# Game state
game_state = {
	'board': [''] * 9,
	'current_turn': 'X',
	'winner': None,
	'scoreboard': {'X': 0, 'O': 0}
}

def check_winner(board):
	winning_combinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
		[0, 4, 8], [2, 4, 6]              # Diagonals
	]
	for combo in winning_combinations:
		if board[combo[0]] == board[combo[1]] == board[combo[2]] and board[combo[0]] != '':
			return board[combo[0]]
	if '' not in board:
		return 'Draw'
	return None

def computer_move(board):
	available_moves = [i for i, cell in enumerate(board) if cell == '']
	return random.choice(available_moves)

@app.route('/')
def index():
	return render_template('index.html')

@socketio.on('make_move')
def handle_make_move(data):
	position = int(data['position'])
	if game_state['board'][position] == '' and game_state['winner'] is None:
		game_state['board'][position] = 'X'
		game_state['winner'] = check_winner(game_state['board'])
		if game_state['winner'] is None:
			computer_position = computer_move(game_state['board'])
			game_state['board'][computer_position] = 'O'
			game_state['winner'] = check_winner(game_state['board'])
		if game_state['winner']:
			if game_state['winner'] != 'Draw':
				game_state['scoreboard'][game_state['winner']] += 1
		game_state['current_turn'] = 'X' if game_state['current_turn'] == 'O' else 'O'
		emit('update_board', game_state, broadcast=True)

@socketio.on('reset_game')
def handle_reset_game():
	game_state['board'] = [''] * 9
	game_state['current_turn'] = 'X'
	game_state['winner'] = None
	emit('update_board', game_state, broadcast=True)

if __name__ == '__main__':
	socketio.run(app, debug=True)
