from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    wins = db.Column(db.Integer, default=0)

class Leaderboard:
    @staticmethod
    def get_leaderboard():
        users = User.query.order_by(User.wins.desc()).all()
        return [{'username': user.username, 'wins': user.wins} for user in users]

