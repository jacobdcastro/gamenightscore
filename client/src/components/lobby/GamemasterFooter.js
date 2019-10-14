import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRound, endRound, newRound } from '../../redux/actions/game';

const GamemasterFooter = ({
  currentRoundId,
  rounds,
  players,
  startRound,
  endRound,
}) => {
  const [winner, setWinner] = useState('');
  const [roundCycle, setRoundCycle] = useState({
    inProgress: false,
    finished: false,
    allScoresSubmitted: false,
    newRoundReady: false,
  });
  const {
    inProgress,
    finished,
    allScoresSubmitted,
    newRoundReady,
  } = roundCycle;
  let currentRoundData = rounds.find(r => r._id === currentRoundId);
  console.log(currentRoundData);

  // object is added to in _roundActions()
  let actionData = {
    gameId: localStorage.gameId,
  };

  const runStartRoundAction = () => {
    actionData.startTime = Date.now();
    setRoundCycle({ inProgress: true });
    startRound(actionData);
    console.log('Round Start!');
  };

  const runEndRoundAction = () => {
    actionData.winnerId = winner;
    endRound(actionData);
    // setRoundCycle({ newRoundReady: true });
    console.log('Round Ended!');
  };

  const setUpNewRound = () => {};

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
            setRoundCycle({
              inProgress: false,
              finished: true,
            });
          }}
        >
          End Round
        </button>
      )}

      {/* 3. Select Winner Button */}
      {!inProgress && finished && (
        <div>
          <p>Select the winner!</p>
          {players.map(p => (
            <button key={p._id} onClick={() => setWinner(p._id)}>
              {p.name}
            </button>
          ))}
          <button onClick={() => runEndRoundAction()}>Submit Winner</button>
        </div>
      )}

      {/* 4. Wait for all players to submit scores */}
      {newRoundReady && !allScoresSubmitted && (
        <Fragment>
          <button disabled>Next round!</button>
          <p>Waiting for all players to submit their scores...</p>
        </Fragment>
      )}

      {/* ? 4.5. Let gamemaster submit their score here */}

      {/* 5. Create/Go to next round */}
      {newRoundReady && allScoresSubmitted && (
        <button onClick={() => setUpNewRound()}>Next round!</button>
      )}
    </div>
  );
};

GamemasterFooter.propTypes = {
  currentRoundId: PropTypes.string.isRequired,
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  startRound: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentRoundId: state.game.currentRound,
  rounds: state.game.rounds,
  players: state.game.players,
});

export default connect(
  mapStateToProps,
  { startRound, endRound, newRound }
)(GamemasterFooter);
