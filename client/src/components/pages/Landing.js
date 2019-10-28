import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LandingWrapper from '../../styles/pages/Landing.sty';

const Landing = () => {
  // const { token, gameId, playerId } = localStorage;
  // if (token) {
  //   if (gameId && !playerId) return <Redirect to="/create-player" />;
  //   if (gameId && playerId) return <Redirect to="/lobby" />;
  //   if (!gameId && !playerId) return <Redirect to="/create-game" />;
  // }

  return (
    <LandingWrapper>
      <Container maxWidth="md">
        <h1>GamenightScore</h1>
        <h2>
          A Web App for keeping score for
          <br />
          <span className="dutchBlitzLogo">Dutch Blitz</span>
        </h2>

        <p>
          Note: Whoever creates the game will be the "Gamemaster". Gamemasters
          have permissions to start new rounds, change other's scores (if
          they're not online), end a game, remove players from games, and more.
        </p>
        <p>If you are the chosen one, you may proceed to Create New Game.</p>

        <div className="gameLinks">
          <Link to="/create-game">
            <Button variant="contained" size="large" color="secondary">
              Create New Game
            </Button>
          </Link>
          <Link to="/join-game">
            <Button variant="contained" size="large" color="primary">
              Join Game
            </Button>
          </Link>
        </div>

        <div>
          <p>
            Don't know how to play Dutch Blitz?
            <br />
            Here's the official instructions from the{' '}
            <a href="https://www.dutchblitz.com/">Dutch Blitz Website</a>.
          </p>
        </div>
      </Container>
    </LandingWrapper>
  );
};

export default Landing;
