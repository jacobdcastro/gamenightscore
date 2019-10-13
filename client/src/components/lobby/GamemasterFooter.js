import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRound, endRound } from '../../redux/actions/game';

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
  });
  const { inProgress, finished } = roundCycle;

  useEffect(() => {
    let currentRoundData = rounds.find(r => r._id === currentRoundId);
    setRoundCycle({ inProgress: currentRoundData.inProgress });
    console.log(currentRoundData);
  }, []);

  // object is added to in _roundActions()
  let actionData = {
    gameId: localStorage.gameId,
  };

  const runStartRoundAction = () => {
    actionData.startTime = Date.now();
    setRoundCycle((roundCycle.inProgress = true));
    startRound(actionData);
    console.log('Round Start!');
  };

  const runEndRoundAction = () => {
    actionData.winnerId = winner;
    endRound(actionData);
    console.log('Round Ended!');
  };

  return (
    <div id="gamemasterFooter">
      {!inProgress && !finished && (
        <button className="startBtn" onClick={() => runStartRoundAction()}>
          Start Round
        </button>
      )}
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
      {!inProgress && finished && (
        <div>
          <p>Select the winner!</p>
          {players.map(p => (
            <button key={p._id} onClick={() => setWinner(p._id)}>
              <p>{p.name}</p>
            </button>
          ))}
          <button onClick={() => runEndRoundAction()}>Submit Winner</button>
        </div>
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
  { startRound, endRound }
)(GamemasterFooter);
