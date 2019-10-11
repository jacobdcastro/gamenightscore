import React from 'react';
import PropTypes from 'prop-types';

const RoundListing = ({ roundNumber, inProgress, winner, playerScores }) => {
  let totalRoundScore;

  return (
    <div className="roundListing">
      <h3>{roundNumber}</h3>
      <div>
        <p>Winner: {winner}</p>
      </div>
      <div className="totalScore">
        <span>Score:</span>
        <h3>{totalRoundScore}</h3>
      </div>
    </div>
  );
};

RoundListing.propTypes = {
  roundNumber: PropTypes.number,
  inProgress: PropTypes.bool,
  winner: PropTypes.string,
  playerScores: PropTypes.array,
};

export default RoundListing;
