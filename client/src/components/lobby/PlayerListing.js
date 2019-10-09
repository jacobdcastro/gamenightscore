import React from 'react';
import PropTypes from 'prop-types';

const PlayerListing = ({
  name,
  totalScore,
  connected,
  isGamemaster,
  roundsPlayed,
}) => {
  // const roundsWon = roundsPlayed.map();
  // const lastRound = roundsPlayed[roundsPlayed.length - 1].score; // ? umm yeah?

  return (
    <div className="playerListing">
      {/* <img /> the deck icon */}
      <h3>{totalScore}</h3>
      <h3>{name}</h3>
      <div>
        {/* {roundsWon && <p>Rounds won: {roundsWon}</p>}
        {lastRound && <p>Last Round Score: {lastRound}</p>} */}
      </div>
    </div>
  );
};

PlayerListing.propTypes = {
  name: PropTypes.string,
  totalScore: PropTypes.number,
  connected: PropTypes.bool,
  isGamemaster: PropTypes.bool,
  roundsPlayed: PropTypes.array,
};

export default PlayerListing;
