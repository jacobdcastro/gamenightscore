import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrentRoundHeaderWrapper from '../../styles/lobby/CurrentRoundHeader.sty.js';

const CurrentRoundHeader = ({ roundData, players, currentRoundIsScored }) => {
  const { inProgress, finished, allScoresSubmitted, newRoundReady } = roundData;
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 600);
  }, [roundData]);

  let currentRoundWinner;
  currentRoundWinner = players.find(p => p._id === roundData.winner);

  return (
    <CurrentRoundHeaderWrapper updated={updated}>
      {!inProgress && !finished && (
        <p>
          New Round! <br />
          Waiting on Gamemaster to start round...
        </p>
      )}

      {inProgress && !finished && <p>Round has begun!!!</p>}

      {!inProgress && finished && !allScoresSubmitted && (
        <p>
          Round is over!
          {roundData.winner && ` ${currentRoundWinner.name} has won.`}
          <br />
          {!currentRoundIsScored && 'Please enter your score below.'}
        </p>
      )}
      {newRoundReady && allScoresSubmitted && (
        <p>
          All scores have been submitted!
          <br />
          Waiting on Gamemaster to go to next round...
        </p>
      )}
    </CurrentRoundHeaderWrapper>
  );
};

CurrentRoundHeader.propTypes = {
  roundData: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundIsScored: PropTypes.object,
};

export default CurrentRoundHeader;
