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

  const initNextRound = () => {
    newRound(actionData);
  };

  return (
    <GamemasterFooterWrapper id="gamemasterFooter">
      <button
        className="addPlayerBtn"
        onClick={() => toggleNewPlayerPopup(true)}
      >
        Add New Player
      </button>

      {newRoundReady && allScoresSubmitted ? (
        <button className="endGameBtn" onClick={() => toggleEndGamePopup(true)}>
          End Game
        </button>
      ) : (
        <button className="endGameBtn" disabled>
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
      {currentRound.winner && !allScoresSubmitted && (
        <ScoreSubmission
          currentRoundIsScored={currentRoundIsScored}
          currentRoundData={currentRound}
        />
      )}

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
