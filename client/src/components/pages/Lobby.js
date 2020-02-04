import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import { setCurrentRoundData } from '../../redux/actions/currentRound';
import Pusher from 'pusher-js';

import LobbyWrapper from '../../styles/lobby/Lobby.sty.js';
import Standings from '../lobby/pageviews/Standings';
import Rounds from '../lobby/pageviews/Rounds';
import Chart from '../lobby/pageviews/Chart';
import CurrentRoundHeader from '../lobby/CurrentRoundHeader';

import Nav from '../lobby/Nav';
import PageViewTab from '../lobby/PageViewTab';
import CircularProgress from '@material-ui/core/CircularProgress';

// gamemaster specific components
import GMFooter from '../lobby/gamemaster/GamemasterFooter';
import Dialogs from '../lobby/Dialogs';

const Lobby = ({
  isGamemaster,
  game,
  playerId,
  getGameData,
  setCurrentRoundData,
}) => {
  const [pageView, setPageView] = useState(0); // 0 = standings, 1 = rounds, 2 = chart

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
    setCurrentRoundData(currentRoundData);
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
    if (pageView === 0) pageViewComponent = <Standings />;
    else if (pageView === 1) pageViewComponent = <Rounds />;
    else if (pageView === 2)
      pageViewComponent = <Chart currentRound={currentRoundData.roundNumber} />;
  } else {
    pageViewComponent = (
      <div style={{ margin: '60px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <LobbyWrapper>
      {currentRoundData && <Dialogs currentRoundData={currentRoundData} />}

      <Nav
        currentRoundData={currentRoundData}
        currentRoundIsScored={currentRoundIsScored}
      />

      <div className='currentRound'>
        {currentRoundData && (
          <CurrentRoundHeader
            roundData={currentRoundData}
            players={players}
            maxNumberOfRounds={game.maxNumberOfRounds}
            currentRoundIsScored={currentRoundIsScored}
          />
        )}
      </div>

      <div className='pageViewMenu'>
        <PageViewTab pageView={pageView} setPageView={setPageView} />
      </div>

      {/* changed conditionally above return */}
      {pageViewComponent}

      {isGamemaster && !game.expired && (
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
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.game.isLoading,
  game: state.game,
  isGamemaster: state.player.isGamemaster,
  playerId: state.player._id,
});

export default connect(mapStateToProps, { getGameData, setCurrentRoundData })(
  Lobby
);
