import React from 'react';
import { Link } from 'react-router-dom';

const Score = ({ score, totalQuestions }) => {
  return (
    <div>
      <h2>Game Over</h2>
      <p>Your score: {score}/{totalQuestions}</p>
      <Link to="/game">
        <button>Play Again</button>
      </Link>
    </div>
  );
};

export default Score;