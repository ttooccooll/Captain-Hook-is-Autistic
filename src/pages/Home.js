
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Captain Hook is Autistic</h1>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default Home;