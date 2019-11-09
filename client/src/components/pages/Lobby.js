import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import Pusher from 'pusher-js';

import LobbyWrapper from '../../styles/lobby/Lobby.sty.js';
import Standings from '../lobby/pageviews/Standings';
import Rounds from '../lobby/pageviews/Rounds';
import CurrentRoundHeader from '../lobby/CurrentRoundHeader';
import PlayerSubmitScore from '../lobby/PlayerSubmitScore';
import InfoTab from '../lobby/InfoTab';
import Nav from '../lobby/Nav';
import PageViewTab from '../lobby/PageViewTab';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

// gamemaster specific components
import GMFooter from '../lobby/gamemaster/GamemasterFooter';
import NewPlayerPopup from '../lobby/gamemaster/NewPlayerPopup';
import EndGamePopup from '../lobby/gamemaster/EndGamePopup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Lobby = ({ isGamemaster, game, playerId, getGameData }) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds
  const [infoDialogIsOpen, toggleInfoDialog] = useState(false);
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

    return () => {
      pusher.unsubscribe('games');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currentRoundData;
  let currentRoundIsScored;
  if (players && rounds) {
    currentRoundData = rounds.find(r => r._id === game.currentRound);
    const playersCurrentRoundScoreData = currentRoundData.playerScores.find(
      p => p.player === playerId
    );
    if (playersCurrentRoundScoreData) {
      currentRoundIsScored = true;
    } else if (playersCurrentRoundScoreData === undefined) {
      currentRoundIsScored = false;
    }
  }

  let pageViewComponent;
  // wait for rounds/players to load before rendering page view component
  if (players && rounds) {
    if (pageView) pageViewComponent = <Rounds />;
    else pageViewComponent = <Standings />;
  } else {
    pageViewComponent = (
      <div style={{ margin: '60px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <LobbyWrapper>
      {currentRoundData && (
        <Dialog
          open={infoDialogIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => toggleInfoDialog(false)}
          aria-labelledby="game information popup"
          aria-describedby="information about game such as game name and password, number of players"
          className="infoDialog"
        >
          <InfoTab toggleInfoDialog={toggleInfoDialog} />
        </Dialog>
      )}

      {currentRoundData && isGamemaster && !game.expired && (
        <Dialog
          open={newPlayerPopupIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => toggleNewPlayerPopup(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="newPlayerPopup"
        >
          <NewPlayerPopup toggleNewPlayerPopup={toggleNewPlayerPopup} />
        </Dialog>
      )}

      {currentRoundData && isGamemaster && !game.expired && (
        <Dialog
          open={endGamePopupIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => toggleEndGamePopup(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="endGamePopup"
        >
          <EndGamePopup toggleEndGamePopup={toggleEndGamePopup} />
        </Dialog>
      )}

      <Nav
        toggleInfoDialog={toggleInfoDialog}
        currentRoundData={currentRoundData}
      />

      <div className="currentRound">
        {currentRoundData && (
          <CurrentRoundHeader
            roundData={currentRoundData}
            players={players}
            maxNumberOfRounds={game.maxNumberOfRounds}
            currentRoundIsScored={currentRoundIsScored}
          />
        )}
      </div>

      <div className="pageViewMenu">
        <PageViewTab pageView={pageView} setPageView={setPageView} />
      </div>

      {pageViewComponent}

      {currentRoundData && players && !game.expired && !isGamemaster && (
        <Dialog
          open={currentRoundData.finished && !currentRoundIsScored}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="Submit your score"
          aria-describedby="score submission for current round"
        >
          <PlayerSubmitScore
            currentRoundIsScored={currentRoundIsScored}
            roundData={currentRoundData}
          />
        </Dialog>
      )}

      {isGamemaster && !game.expired && (
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
  { getGameData }
)(Lobby);
