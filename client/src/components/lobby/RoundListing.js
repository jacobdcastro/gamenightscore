import React from 'react';
import PropTypes from 'prop-types';

const RoundListing = ({ data }) => {
  const { roundNumber, inProgress, winner, playerScores } = data;
  let totalRoundScore;

  return (
    <div className="roundListing">
      <h3>Round: {roundNumber}</h3>
      <div>
        <p>Winner: {winner ? winner : 'No winner declared!'}</p>
      </div>
      <div className="totalScore">
        <span>Round Total:</span>
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
