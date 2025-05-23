import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = ({ score, totalQuestions, onPlayAgain }) => {
  const navigate = useNavigate();

  const playMP3 = () => {
    const audio = new Audio("/sounds/kingm.mp3");
    audio.volume = 0.25;
    audio.play();
  };

  const handlePlayAgainClick = () => {
    playMP3();
    onPlayAgain();
    navigate('/game');
  };

  return (
    <div>
      <h1>Game Over</h1>
      <p className='gameover'>Your score: {score}/{totalQuestions} Would you like to play again?</p>
      <button onClick={handlePlayAgainClick}></button>
    </div>
  );
};

export default Score;