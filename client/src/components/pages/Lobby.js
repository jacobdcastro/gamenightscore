import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import { getPlayerData } from '../../redux/actions/player';

import LobbyWrapper from '../../styles/lobby/Lobby.sty.js';
import Standings from '../lobby/Standings';
import Rounds from '../lobby/Rounds';
import GMFooter from '../lobby/GamemasterFooter';

const Lobby = ({
  isGamemaster,
  isLoading,
  players,
  rounds,
  getGameData,
  getPlayerData,
}) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds

  useEffect(() => {
    getGameData(localStorage.gameId);
  }, []);

  // TODO duplicate for rounds
  if (players) {
    const playerData = players.find(p => p._id === localStorage.playerId);
    getPlayerData(playerData);
  }

  let pageViewComponent;
  // wait for rounds/players to load before rendering page view component
  if (rounds && players) {
    if (pageView) pageViewComponent = <Rounds />;
    else pageViewComponent = <Standings />;
  } else {
    pageViewComponent = <h2>Loading...</h2>;
  }

  return (
    <LobbyWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <div className="currentRound">
        <h2>Current Round: 1</h2>
        <p>Waiting on Gamemaster to start round...</p>
      </div>
      <div className="pageViewMenu">
        <div
          onClick={() => setPageView(0)}
          className={`switch ${!pageView ? 'selected' : 'notSelected'}`}
        >
          <h2 className="standingsBtn">Standings</h2>
        </div>
        <div
          onClick={() => setPageView(1)}
          className={`switch ${pageView ? 'selected' : 'notSelected'}`}
        >
          <h2 className="roundsBtn">Rounds</h2>
        </div>
      </div>

      {pageViewComponent}

      <button onClick={() => getGameData(localStorage.gameId)}>
        Update Game State
      </button>

      {rounds && players && isGamemaster && <GMFooter />}
    </LobbyWrapper>
  );
};

Lobby.propTypes = {
  isLoading: PropTypes.bool,
  players: PropTypes.array,
  rounds: PropTypes.array,
  getGameData: PropTypes.func.isRequired,
  getPlayerData: PropTypes.func.isRequired,
  isGamemaster: PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoading: state.game.isLoading,
  players: state.game.players,
  rounds: state.game.rounds,
  isGamemaster: state.player.isGamemaster,
});

export default connect(
  mapStateToProps,
  { getGameData, getPlayerData }
)(Lobby);
