
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Captain Hook is Autistic</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>Click the button to start the game.</h2>
        <Link to="/game">
          <button></button>
        </Link>
      </div>
    </div>
  );
};

export default Home;