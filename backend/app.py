from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
socketio = SocketIO(app)

# Game state
game_state = {
	'board': ['' for _ in range(9)],
	'current_turn': 'X',
	'winner': None
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

@app.route('/')
def index():
	return render_template('index.html')

@socketio.on('make_move')
def handle_make_move(data):
	global game_state
	position = data['position']
	if game_state['board'][position] == '' and game_state['winner'] is None:
		game_state['board'][position] = game_state['current_turn']
		game_state['winner'] = check_winner(game_state['board'])
		if game_state['winner'] is None:
			game_state['current_turn'] = 'O' if game_state['current_turn'] == 'X' else 'X'
		emit('update_board', game_state, broadcast=True)

if __name__ == '__main__':
	socketio.run(app, debug=True)
