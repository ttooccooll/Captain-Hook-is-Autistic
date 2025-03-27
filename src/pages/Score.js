
import React from 'react';
import { Link } from 'react-router-dom';

const Score = () => {
  return (
    <div>
      <h1>Your Score</h1>
      <p>Score: 5/10</p>
      <Link to="/game">
        <button>Play Again</button>
      </Link>
    </div>
  );
};

export default Score;