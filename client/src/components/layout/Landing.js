import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div id="landing">
      <h1>GamenightScore</h1>
      <h2>A Web App for keeping score of Dutch Blitz/Nertz card games.</h2>

      <div>
        <Link to="/">Create New Game</Link>
        <Link to="/">Join Game</Link>
      </div>
    </div>
  );
};

export default Landing;
