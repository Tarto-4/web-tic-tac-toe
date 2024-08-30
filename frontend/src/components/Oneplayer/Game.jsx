import React, { useState } from 'react';
import './Game.css';

const initialBoard = Array(9).fill(null);

function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(square => square)) {
      setWinner('Draw');
    } else {
      makeComputerMove(newBoard);
    }
  };

  const makeComputerMove = (newBoard) => {
    const emptyIndices = newBoard.map((val, idx) => (val === null ? idx : -1)).filter(idx => idx !== -1);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    if (randomIndex !== undefined) {
      newBoard[randomIndex] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }
  };

  const renderSquare = (index) => (
    <button
      className="square"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="status">
        {winner ? (winner === 'Draw' ? 'Draw!' : `${winner} wins!`) : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div>
            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;