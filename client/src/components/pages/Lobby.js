// require('dotenv').config();
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import { getPlayerData } from '../../redux/actions/player';
import Pusher from 'pusher-js';

import LobbyWrapper from '../../styles/lobby/Lobby.sty.js';
import Standings from '../lobby/Standings';
import Rounds from '../lobby/Rounds';
import SubmitScore from '../lobby/SubmitScore';
import GMFooter from '../lobby/gamemaster/GamemasterFooter';
import CurrentRoundHeader from '../lobby/CurrentRoundHeader';

const Lobby = ({
  isGamemaster,
  isLoading,
  game,
  playerId,
  getGameData,
  getPlayerData,
}) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds
  const { players, rounds } = game;

  useEffect(() => {
    getGameData(localStorage.gameId);
    const pusher = new Pusher('50eaff733e0fbc1bba46', {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: false,
      authEndpoint: `${process.env.REACT_APP_API_URL}/auth/pusher`,
    });

    const channel = pusher.subscribe('presence-games');
    console.log(channel);
    channel.bind('inserted', () => getGameData(localStorage.gameId));
    channel.bind('deleted', () => getGameData(localStorage.gameId));
    channel.bind('updated', () => getGameData(localStorage.gameId));
  }, []);

  const updatePlayerState = () => {
    const playerData = players.find(p => p._id === localStorage.playerId);
    getPlayerData(playerData);
  };

  let currentRoundData;
  let currentRoundIsScored;
  if (players && rounds) {
    updatePlayerState();
    currentRoundData = rounds.find(r => r._id === game.currentRound);
    currentRoundIsScored = currentRoundData.playerScores.find(
      p => p.player === playerId
    );
  }

  let roundFinished;
  if (currentRoundData) {
    roundFinished = currentRoundData.finished;
    // roundStarted = currentRoundData;
  }

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
        {currentRoundData && (
          <CurrentRoundHeader roundData={currentRoundData} players={players} />
        )}
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

      {/* <button onClick={() => getGameData(localStorage.gameId)}>
        Update Game State
      </button> */}

      {roundFinished && !currentRoundIsScored && !isGamemaster && (
        <SubmitScore
          roundData={currentRoundData}
          currentRoundIsScored={currentRoundIsScored}
        />
      )}

      {rounds && players && isGamemaster && (
        <GMFooter currentRoundIsScored={currentRoundIsScored} />
      )}
    </LobbyWrapper>
  );
};

Lobby.propTypes = {
  isLoading: PropTypes.bool,
  game: PropTypes.object,
  isGamemaster: PropTypes.bool,
  getGameData: PropTypes.func.isRequired,
  getPlayerData: PropTypes.func.isRequired,
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.game.isLoading,
  game: state.game,
  isGamemaster: state.player.isGamemaster,
  playerId: state.player._id,
});

export default connect(
  mapStateToProps,
  { getGameData, getPlayerData }
)(Lobby);
