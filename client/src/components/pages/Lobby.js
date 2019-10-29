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
import CurrentRoundHeader from '../lobby/CurrentRoundHeader';
import InfoTab from '../lobby/InfoTab';
import Nav from '../lobby/Nav';
import PageViewTab from '../lobby/PageViewTab';
import ScoreSubmission from '../lobby/gamemaster/ScoreSubmission';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// gamemaster specific components
import GMFooter from '../lobby/gamemaster/GamemasterFooter';
import NewPlayerPopup from '../lobby/gamemaster/NewPlayerPopup';
import EndGamePopup from '../lobby/gamemaster/EndGamePopup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Lobby = ({
  isGamemaster,
  isLoading,
  game,
  playerId,
  getGameData,
  getPlayerData,
}) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds
  const [infoTabIsOpen, toggleInfoTab] = useState(false);
  const [newPlayerPopupIsOpen, toggleNewPlayerPopup] = useState(false);
  const [endGamePopupIsOpen, toggleEndGamePopup] = useState(false);
  const { players, rounds } = game;

  useEffect(() => {
    getGameData(localStorage.gameId);

    // create connection to Pusher
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: false,
      // authEndpoint: `${process.env.REACT_APP_API_URL}/auth/pusher`,
    });

    // subscribe client to pusher channel, bind to events
    const channel = pusher.subscribe('games');
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
      {currentRoundData && infoTabIsOpen && (
        <InfoTab toggleInfoTab={toggleInfoTab} />
      )}
      {newPlayerPopupIsOpen && (
        <NewPlayerPopup toggleNewPlayerPopup={toggleNewPlayerPopup} />
      )}
      {endGamePopupIsOpen && (
        <EndGamePopup toggleEndGamePopup={toggleEndGamePopup} />
      )}

      <Nav toggleInfoTab={toggleInfoTab} currentRoundData={currentRoundData} />

      <div className="currentRound">
        {currentRoundData && (
          <CurrentRoundHeader
            roundData={currentRoundData}
            players={players}
            currentRoundIsScored={currentRoundIsScored}
          />
        )}
      </div>

      <div className="pageViewMenu">
        <PageViewTab pageView={pageView} setPageView={setPageView} />
      </div>

      {pageViewComponent}

      <Dialog
        open={roundFinished && !currentRoundIsScored && !isGamemaster}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <ScoreSubmission
          currentRoundIsScored={currentRoundIsScored}
          roundData={currentRoundData}
        />
      </Dialog>

      {rounds && players && isGamemaster && (
        <GMFooter
          currentRoundIsScored={currentRoundIsScored}
          toggleNewPlayerPopup={toggleNewPlayerPopup}
          toggleEndGamePopup={toggleEndGamePopup}
        />
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
