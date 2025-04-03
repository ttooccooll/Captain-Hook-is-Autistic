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
      <p className='over'>Your most recent score: {score}/{totalQuestions}</p>
      <p className='over'>You've played {gameCount} games.</p>
      <p className='over'>Your average score: {averageScore.toFixed(2)}/10</p>
      <p className='over'>Would you like to play again?</p>
      <button onClick={handlePlayAgainClick}></button>
      <div className='credits'>
        <p>Concept by Herzl Tuckman</p>
        <p>Game mechanics and bitcoin shit by <a href="https://stacker.news/jasonb" target="blank" >jasonb</a></p>
        <p>Questions by <a href="https://stacker.news/jasonb" target="blank" >jasonb</a> and <a href="https://stacker.news/dagny761" target="blank" >dagny761</a></p>
      </div>
    </div>
  );
};

export default Stats;