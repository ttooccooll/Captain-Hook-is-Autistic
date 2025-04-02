import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = ({ score, totalQuestions, onPlayAgain }) => {
  const navigate = useNavigate();

  const playMP3 = () => {
    const audio = new Audio("/sounds/kingm.mp3");
    audio.play();
  };

  const handlePlayAgainClick = () => {
    playMP3();
    onPlayAgain();
    navigate('/game');
  };

  const handleStatsClick = () => {
    playMP3();
    navigate('/stats');
  };

  return (
    <div>
      <h1>Game Over</h1>
      <p className='gameover'>Your score: {score}/{totalQuestions} Would you like to play again?</p>
      <button onClick={handlePlayAgainClick}></button>
      <p>your stats</p>
      <button onClick={handleStatsClick}></button>
    </div>
  );
};

export default Score;