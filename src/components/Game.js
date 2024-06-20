import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem('score'));
    if (savedScore) {
      setScore(savedScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  const handleClick = (index) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squaresCopy[index]) return;
    squaresCopy[index] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(squaresCopy);
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
  };

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

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="score-board">
        <span>Player X (Blue): {score.X}</span>
        <span>Player O (Red): {score.O}</span>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <button onClick={handleReset}>Restart Game</button>
    </div>
  );
};

export default Game;
