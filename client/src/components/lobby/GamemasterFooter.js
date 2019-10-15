import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startRound,
  endRound,
  setWinner,
  newRound,
} from '../../redux/actions/currentRound';

const GamemasterFooter = ({
  rounds,
  players,
  currentRoundId,
  startRound,
  endRound,
  setWinner,
}) => {
  const [winner, setWinnerState] = useState('');

  const currentRound = rounds.find(r => r._id === currentRoundId);
  const {
    inProgress,
    finished,
    allScoresSubmitted,
    newRoundReady,
  } = currentRound;

  // object is added to in _roundActions()
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
    <div id="gamemasterFooter">
      {/* 1. Start Round Button */}
      {!inProgress && !finished && (
        <button className="startBtn" onClick={() => runStartRoundAction()}>
          Start Round
        </button>
      )}

      {/* 2. End Round Button */}
      {inProgress && !finished && (
        <button
          className="endBtn"
          onClick={() => {
            actionData.endTime = Date.now();
            runEndRoundAction();
          }}
        >
          End Round
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

      {/* 3.2 gamemaster can submit scores for other players not online */}

      {/* 4. Wait for all players to submit scores */}
      {newRoundReady && !allScoresSubmitted && (
        <Fragment>
          <button disabled>Next round!</button>
          <p>Waiting for all players to submit their scores...</p>
        </Fragment>
      )}

      {/* 5. Create/Go to next round */}
      {newRoundReady && allScoresSubmitted && (
        <button onClick={() => initNextRound()}>Next round!</button>
      )}
    </div>
  );
};

GamemasterFooter.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundId: PropTypes.string.isRequired,
  startRound: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  newRound: PropTypes.func.isRequired,
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
