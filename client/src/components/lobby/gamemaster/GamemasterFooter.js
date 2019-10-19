import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startRound,
  endRound,
  setWinner,
  newRound,
} from '../../../redux/actions/currentRound';
import { submitPlayerScore } from '../../../redux/actions/game';
import GamemasterFooterWrapper from '../../../styles/lobby/Gamemaster.sty.js';

const GamemasterFooter = ({
  rounds,
  players,
  playerId,
  currentRoundId,
  currentRoundIsScored,
  startRound,
  endRound,
  setWinner,
  newRound,
  submitPlayerScore,
}) => {
  const [winner, setWinnerState] = useState('');
  const [roundScore, setRoundScore] = useState(0);

  const currentRound = rounds.find(r => r._id === currentRoundId);
  const {
    inProgress,
    finished,
    allScoresSubmitted,
    newRoundReady,
    roundNumber,
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

  const handleChange = e => {
    setRoundScore(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    actionData.playerId = playerId;
    actionData.roundScore = roundScore;
    console.log(actionData);
    submitPlayerScore(actionData);
  };

  const initNextRound = () => {
    newRound(actionData);
  };

  return (
    <GamemasterFooterWrapper id="gamemasterFooter">
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
      {currentRound.winner && !currentRoundIsScored && (
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="scoreSubmission">
            {playerId === winner
              ? `Congrats! You won round ${roundNumber}! Submit your score.`
              : `Submit score for round ${roundNumber}`}
          </label>
          <input
            id="scoreSubmission"
            name="roundScore"
            type="number"
            value={roundScore}
            onChange={e => handleChange(e)}
          />
          <button type="submit">Submit Score</button>
        </form>
      )}

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
    </GamemasterFooterWrapper>
  );
};

GamemasterFooter.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  playerId: PropTypes.string.isRequired,
  currentRoundId: PropTypes.string.isRequired,
  currentRoundIsScored: PropTypes.bool,
  startRound: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  newRound: PropTypes.func.isRequired,
  submitPlayerScore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
  players: state.game.players,
  playerId: state.player._id,
  currentRoundId: state.game.currentRound,
});

export default connect(
  mapStateToProps,
  { startRound, endRound, setWinner, newRound, submitPlayerScore }
)(GamemasterFooter);
