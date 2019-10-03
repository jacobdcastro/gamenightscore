import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div id="landing">
      <h1>GamenightScore</h1>
      <h2>A Web App for keeping score of Dutch Blitz/Nertz card games.</h2>

      <p>
        Note: Whoever creates the game will be the "Gamemaster". Gamemasters
        have permissions to start new rounds, change other's scores (if they're
        not online), end a game, remove players from games, and more.
      </p>
      <p>If you are the chosen one, you may proceed to Create New Game.</p>

      <div>
        <Link to="/create-game">Create New Game</Link>
        <Link to="/join-game">Join Game</Link>
      </div>

      <div>
        <span>Footer stuff.</span>
        <span>Hope all is well!</span>
      </div>
    </div>
  );
};

export default Landing;
