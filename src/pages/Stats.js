import React from 'react';
import { useNavigate } from 'react-router-dom';

const Stats = ({ score, totalQuestions, onPlayAgain, gameCount = 0, count = '', averageScore = 0 }) => {
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

  return (
    <div>
      <p className='gameover'>Your most recent score: {score}/{totalQuestions}</p>
      <p className='gameover'>You've played {gameCount} games.</p>
      <p className='gameover'>Your average score: {averageScore.toFixed(2)}/10</p>
      <p className='gameover'>Would you like to play again?</p>
      <button onClick={handlePlayAgainClick}></button>
    </div>
  );
};

export default Stats;