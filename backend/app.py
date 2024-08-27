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

class Game(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	board = db.Column(db.String(9), nullable=False, default=' ' * 9)
	current_player = db.Column(db.String(1), nullable=False, default='X')
	winner = db.Column(db.String(1), nullable=True)

@app.route('/')
def index():
	return render_template('index.html')

@socketio.on('make_move')
def handle_make_move(data):
	index = data['index']
	player = data['player']
	emit('move_made', {'index': index, 'player': player, 'nextPlayer': 'O' if player == 'X' else 'X'}, broadcast=True)

if __name__ == '__main__':
	socketio.run(app, debug=True)
