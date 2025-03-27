import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = ({ score, totalQuestions, onPlayAgain }) => {
  const navigate = useNavigate();

  const handlePlayAgainClick = () => {
    onPlayAgain();
    navigate('/game');
  };

  return (
    <div>
      <h2>Game Over</h2>
      <p>Your score: {score}/{totalQuestions}</p>
      <button onClick={handlePlayAgainClick}>Play Again</button>
    </div>
  );
};

export default Score;