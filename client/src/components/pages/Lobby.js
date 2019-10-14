import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import { getPlayerData } from '../../redux/actions/player';
import { getCurrentRoundData } from '../../redux/actions/currentRound';

import LobbyWrapper from '../../styles/lobby/Lobby.sty.js';
import Standings from '../lobby/Standings';
import Rounds from '../lobby/Rounds';
import SubmitScore from '../lobby/SubmitScore';
import GMFooter from '../lobby/GamemasterFooter';

const Lobby = ({
  isGamemaster,
  isLoading,
  game,
  currentRound,
  getGameData,
  getPlayerData,
  getCurrentRoundData,
}) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds
  const { players, rounds } = game;

  useEffect(() => {
    getGameData(localStorage.gameId);
  }, []);

  const updateLowerState = () => {
    if (players) {
      const playerData = players.find(p => p._id === localStorage.playerId);
      getPlayerData(playerData);
    }
    if (rounds) {
      const currentRoundData = rounds.find(r => r._id === game.currentRound);
      getCurrentRoundData(currentRoundData);
    }
  };

  // if (players && rounds) updateLowerState();

  let pageViewComponent;
  // wait for rounds/players to load before rendering page view component
  if (players && rounds) {
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

      <button
        onClick={() => {
          getGameData(localStorage.gameId);
          updateLowerState();
        }}
      >
        Update Game State
      </button>

      {/* {!currentRound.inProgress && currentRound.finished && <SubmitScore />} */}

      {rounds && players && isGamemaster && <GMFooter />}
    </LobbyWrapper>
  );
};

Lobby.propTypes = {
  isLoading: PropTypes.bool,
  game: PropTypes.object,
  currentRound: PropTypes.object,
  isGamemaster: PropTypes.bool,
  getGameData: PropTypes.func.isRequired,
  getPlayerData: PropTypes.func.isRequired,
  getCurrentRoundData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.game.isLoading,
  game: state.game,
  currentRound: state.currentRound,
  isGamemaster: state.player.isGamemaster,
});

export default connect(
  mapStateToProps,
  { getGameData, getPlayerData, getCurrentRoundData }
)(Lobby);
