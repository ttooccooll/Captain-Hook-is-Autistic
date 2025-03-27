import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Score from '../pages/Score';
import localForage from 'localforage';

const App = () => {
  const [gameCount, setGameCount] = useState(0);
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

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

    setFinalScore(score);
    setShowScore(true);

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

  const handlePlayAgain = () => {
    // Reset game state
    setShowScore(false);
    setFinalScore(0);

    // Navigate back to the game page
    // This will trigger a new game instance
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          showScore ? <Navigate to="/score" /> : (
            <Game 
              onGameComplete={handleGameComplete} 
              hasSignedIn={hasSignedIn} 
              hasPaid={hasPaid} 
              gameCount={gameCount}
            />
          )
        } />
        <Route path="/score" element={<Score score={finalScore} totalQuestions={10} onPlayAgain={handlePlayAgain} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;