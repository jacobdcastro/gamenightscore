import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startRound,
  endRound,
  setWinner,
  newRound,
} from '../../../redux/actions/currentRound';
import ScoreSubmission from './ScoreSubmission';
import GamemasterFooterWrapper from '../../../styles/lobby/Gamemaster.sty.js';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: '#168f45',
  },
}));

const GamemasterFooter = ({
  rounds,
  players,
  currentRoundId,
  currentRoundIsScored,
  startRound,
  endRound,
  setWinner,
  newRound,
  toggleNewPlayerPopup,
  toggleEndGamePopup,
}) => {
  const [winner, setWinnerState] = useState('');
  const classes = useStyles();

  const currentRound = rounds.find(r => r._id === currentRoundId);
  const {
    inProgress,
    finished,
    allGmPlayersScoresSubmitted,
    allScoresSubmitted,
    newRoundReady,
  } = currentRound;

  // object is added to/manipulated in _RoundAction()'s
  let actionData = {
    gameId: localStorage.gameId,
  };

  const runStartRoundAction = () => {
    actionData.startTime = Date.now();
    startRound(actionData);
    console.log('Round Start!');
  };

  const runEndRoundAction = () => {
    endRound(actionData);
    console.log('Round Ended!');
  };

  const submitWinner = () => {
    actionData.winnerId = winner;
    setWinner(actionData);
    console.log(`${winner} has won!`);
  };

  const initNextRound = () => {
    newRound(actionData);
  };

  return (
    <Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleNewPlayerPopup(true)}
          >
            <PersonAddIcon />
          </IconButton>
          <Fab
            size="large"
            color="primary"
            aria-label="start"
            className={classes.fabButton}
          >
            <StopIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleEndGamePopup(true)}
          >
            <CancelIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <GamemasterFooterWrapper
        id="gamemasterFooter"
        newRoundReady={newRoundReady}
      >
        {/* Add new player button */}
        <button
          className="addPlayerBtn"
          onClick={() => toggleNewPlayerPopup(true)}
        >
          Add New Player
        </button>

        {/* End Game button */}
        {newRoundReady && allScoresSubmitted ? (
          <button
            className="endGameBtn"
            onClick={() => toggleEndGamePopup(true)}
          >
            End Game
          </button>
        ) : (
          <button className="endGameBtn disabled" disabled>
            End Game
          </button>
        )}

        {/* 1. Start Round Button */}
        {!inProgress && !finished && (
          <button
            className="rndBtn startBtn"
            onClick={() => runStartRoundAction()}
          >
            Start
            <br />
            Round
          </button>
        )}

        {/* 2. End Round Button */}
        {inProgress && !finished && (
          <button
            className="rndBtn endBtn"
            onClick={() => {
              actionData.endTime = Date.now();
              runEndRoundAction();
            }}
          >
            End
            <br />
            Round
          </button>
        )}

        {/* 3. Select Winner Button */}
        {!inProgress && finished && !newRoundReady && (
          <Fragment>
            <p>Select the winner!</p>
            {players.map(p => (
              <button key={p._id} onClick={() => setWinnerState(p._id)}>
                {p.name}
              </button>
            ))}
            <button onClick={() => submitWinner()}>Submit Winner</button>
          </Fragment>
        )}

        {/* ? 3.1. Let gamemaster submit their score here */}
        {currentRound.winner && !allGmPlayersScoresSubmitted && (
          <ScoreSubmission
            currentRoundIsScored={currentRoundIsScored}
            currentRoundData={currentRound}
          />
        )}

        {/* 4. Wait for all players to submit scores */}
        {newRoundReady && allGmPlayersScoresSubmitted && !allScoresSubmitted && (
          <Fragment>
            <button disabled>Next round!</button>
            <p>Waiting for all players to submit their scores...</p>
          </Fragment>
        )}

        {/* 5. Create/Go to next round */}
        {newRoundReady && allScoresSubmitted && (
          <button onClick={() => initNextRound()}>Next round!</button>
        )}
      </GamemasterFooterWrapper>
    </Fragment>
  );
};

GamemasterFooter.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundId: PropTypes.string.isRequired,
  currentRoundIsScored: PropTypes.object,
  startRound: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  newRound: PropTypes.func.isRequired,
  toggleNewPlayerPopup: PropTypes.func.isRequired,
  toggleEndGamePopup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
  players: state.game.players,
  currentRoundId: state.game.currentRound,
});

export default connect(
  mapStateToProps,
  { startRound, endRound, setWinner, newRound }
)(GamemasterFooter);
