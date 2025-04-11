import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const playMP3 = () => {
  const audio = new Audio("/sounds/kingm.mp3");
  audio.volume = 0.25;
  audio.play();
};

const Home = () => {
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
      <h1>Captain Hook is Autistic</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>Click the button to start the game.</h2>
        <button onClick={handleButtonClick}>
        </button>
      </div>
    </div>
  );
};

export default Home;