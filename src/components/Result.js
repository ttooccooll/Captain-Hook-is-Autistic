
import React from 'react';
import { Link } from 'react-router-dom';

const Result = ({ score, totalQuestions }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <p>Your score: {score}/{totalQuestions}</p>
      <Link to="/game">
        <button>Play Again</button>
      </Link>
    </div>
  );
};

export default Result;