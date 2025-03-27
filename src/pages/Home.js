
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Movie Trivia Game!</h1>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default Home;