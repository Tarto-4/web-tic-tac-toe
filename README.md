# Tic-Tac-Toe Game

This is a web-based Tic-Tac-Toe game built with Flask for the backend and plain HTML, CSS, and JavaScript for the frontend. The game supports real-time multiplayer functionality using Socket.IO.

## Features

- Real-time multiplayer gameplay
- Scoreboard to keep track of wins
- Reset button to start a new game
- Visual indication of the current player's turn
- Fireworks animation when a player wins

## Prerequisites

- Python 3.x
- Flask
- Flask-SocketIO
- Flask-SQLAlchemy
- Flask-Migrate

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tarto-4/tic-tac-toe.git
   cd tic-tac-toe
   ```
Here is a [`README.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fthato%2FOneDrive%2FDocuments%2FGitHub%2Fweb-tic-tac-toe%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\thato\OneDrive\Documents\GitHub\web-tic-tac-toe\README.md") file for your Tic-Tac-Toe game:

```markdown
# Tic-Tac-Toe Game

This is a web-based Tic-Tac-Toe game built with Flask for the backend and plain HTML, CSS, and JavaScript for the frontend. The game supports real-time multiplayer functionality using Socket.IO.

## Features

- Real-time multiplayer gameplay
- Scoreboard to keep track of wins
- Reset button to start a new game
- Visual indication of the current player's turn
- Fireworks animation when a player wins

## Prerequisites

- Python 3.x
- Flask
- Flask-SocketIO
- Flask-SQLAlchemy
- Flask-Migrate

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tarto-4/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   ```

3. Install the required dependencies:
   ```sh
   pip install flask flask-socketio flask-sqlalchemy flask-migrate
   ```

## Running the Game

1. Change the directory to the `backend` folder:
   ```sh
   cd backend
   ```
2. Start the Flask application:
   ```sh
   python app.py
   ```

2. Open your web browser and navigate to `http://127.0.0.1:5000/` to play the game.

## How to Play

- Click on any cell in the grid to make your move.
- The game will automatically switch turns between players.
- The scoreboard will update with the number of wins for each player.
- Click the "Reset Game" button to start a new game.

## File Structure

- `app.py`: The main Flask application file.
- `templates/index.html`: The HTML template for the game.
- `static/css/style.css`: The CSS file for styling the game.
- `static/js/main.js`: The JavaScript file for game logic and Socket.IO communication.
