import React from 'react';
import PropTypes from 'prop-types';

const RoundListing = ({ data, players }) => {
  const { roundNumber, inProgress, winner, playerScores } = data;

  let winnerPlayerData;
  let winnerRoundData;
  if (winner) {
    winnerPlayerData = players.find(p => p._id === winner);
    winnerRoundData = playerScores.find(p => p.player === winner);
  }

  return (
    <div className="roundListing">
      <h3>Rd: {roundNumber}</h3>
      <div>
        <p>
          {winner && !inProgress
            ? `Winner: ${winnerPlayerData.name}`
            : 'No winner yet...'}
          {!winner && inProgress && `Round currently in progress...`}
        </p>
      </div>
      <div className="totalScore">
        <span>Winner's Score:</span>
        <h3>{winnerRoundData ? winnerRoundData.roundScore : '?'}</h3>
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
