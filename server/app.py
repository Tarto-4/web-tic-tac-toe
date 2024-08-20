from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from models import User, Leaderboard

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('login')
def handle_login(data):
    username = data['username']
    user = User.query.filter_by(username=username).first()
    if not user:
        user = User(username=username, wins=0)
        db.session.add(user)
        db.session.commit()
    emit('updateLeaderboard', Leaderboard.get_leaderboard(), broadcast=True)

@socketio.on('playerMove')
def handle_player_move(data):
    emit('playerMove', data, broadcast=True)

@socketio.on('resetGame')
def handle_reset_game():
    emit('resetGame', broadcast=True)

@socketio.on('gameOver')
def handle_game_over(data):
    winner = data['winner']
    if winner != 'Draw':
        user = User.query.filter_by(username=winner).first()
        if user:
            user.wins += 1
            db.session.commit()
    emit('updateLeaderboard', Leaderboard.get_leaderboard(), broadcast=True)

@socketio.on('getLeaderboard')
def handle_get_leaderboard():
    emit('updateLeaderboard', Leaderboard.get_leaderboard())

if __name__ == '__main__':
    socketio.run(app, debug=True)

