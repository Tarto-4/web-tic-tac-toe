from backend.app import db

class Game(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	board = db.Column(db.String(9), nullable=False, default=' ' * 9)
	current_player = db.Column(db.String(1), nullable=False, default='X')
	winner = db.Column(db.String(1), nullable=True)