import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const playMP3 = () => {
  const audio = new Audio("/sounds/kingm.mp3");
  audio.volume = 0.25;
  audio.play();
};

const Result = ({ score, totalQuestions }) => {

  const [navigateToGame, setNavigateToGame] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    playMP3();
    setTimeout(() => {
      setNavigateToGame(true);
    }, 250);
  };

  if (navigateToGame) {
    navigate('/game');
    return null;
  }

  return (
    <div>
      <h1>Game Over</h1>
      <p>Your score: {score}/{totalQuestions}</p>
      <Link to="/game">
      <button onClick={handleButtonClick}>
      </button>
      </Link>
    </div>
  );
};

export default Result;