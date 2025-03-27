
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Home from '../pages/Home';
import Game from '../pages/Game';
import Score from '../pages/Score';
import localForage from 'localforage';

const App = () => {
  const [gameCount, setGameCount] = useState(0);
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    // Load game count from local storage
    localForage.getItem('gameCount').then(count => {
      if (count) setGameCount(count);
    });

    // Load sign-in status from local storage
    localForage.getItem('hasSignedIn').then(signedIn => {
      if (signedIn) setHasSignedIn(signedIn);
    });

    // Load payment status from local storage
    localForage.getItem('hasPaid').then(paid => {
      if (paid) setHasPaid(paid);
    });
  }, []);

  const handleGameComplete = (score) => {
    const newGameCount = gameCount + 1;
    setGameCount(newGameCount);
    localForage.setItem('gameCount', newGameCount);

    if (newGameCount === 2 && !hasSignedIn) {
      // Prompt for WebLN sign-in
      setHasSignedIn(true);
      localForage.setItem('hasSignedIn', true);
    } else if (newGameCount === 3 && !hasPaid) {
      // Prompt for payment
      setHasPaid(true);
      localForage.setItem('hasPaid', true);
    }
  };

  return (
    <Router>
      <Routes> {/* Updated from Switch to Routes */}
        <Route path="/" element={<Home />} /> {/* Updated to use element prop */}
        <Route path="/game" element={<Game 
          onGameComplete={handleGameComplete} 
          hasSignedIn={hasSignedIn} 
          hasPaid={hasPaid} 
          gameCount={gameCount}
        />} /> {/* Updated to use element prop */}
        <Route path="/score" element={<Score />} /> {/* Updated to use element prop */}
      </Routes>
    </Router>
  );
};

export default App;