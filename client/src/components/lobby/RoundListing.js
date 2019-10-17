import React from 'react';
import PropTypes from 'prop-types';

const RoundListing = ({ data, players }) => {
  const { roundNumber, inProgress, winner, playerScores } = data;
  let totalRoundScore;

  let winnerName;
  if (data.winner) {
    if (data.winner) winnerName = players.find(p => p._id === data.winner);
  }

  return (
    <div className="roundListing">
      <h3>Round: {roundNumber}</h3>
      <div>
        <p>Winner: {winner ? winnerName.name : 'No winner yet...'}</p>
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
