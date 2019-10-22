import React from 'react';
import PropTypes from 'prop-types';
import CurrentRoundHeaderWrapper from '../../styles/lobby/CurrentRoundHeader.sty.js';

const CurrentRoundHeader = ({ roundData, players, currentRoundIsScored }) => {
  const { inProgress, finished, allScoresSubmitted, newRoundReady } = roundData;
  let currentRoundWinner;
  currentRoundWinner = players.find(p => p._id === roundData.winner);

  return (
    <CurrentRoundHeaderWrapper
      inProgress={inProgress}
      finished={finished}
      allScoresSubmitted={allScoresSubmitted}
      newRoundReady={newRoundReady}
    >
      {!inProgress && !finished && (
        <p>
          New Round! <br />
          Waiting on Gamemaster to start round...
        </p>
      )}

      {inProgress && !finished && <p>Round has begun!!!</p>}

      {!inProgress && finished && (
        <p>
          Round is over!
          <br />
          {roundData.winner && `${currentRoundWinner.name} has won.`}
          <br />
          {!currentRoundIsScored && 'Please enter your score below.'}
        </p>
      )}
      {newRoundReady && allScoresSubmitted && (
        <p>
          All scores have updated! Waiting on Gamemaster to go to next round...
        </p>
      )}
    </CurrentRoundHeaderWrapper>
  );
};

CurrentRoundHeader.propTypes = {
  roundData: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundIsScored: PropTypes.object.isRequired,
};

export default CurrentRoundHeader;
