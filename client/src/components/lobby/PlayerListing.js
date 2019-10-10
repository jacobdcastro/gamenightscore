import React from 'react';
import PropTypes from 'prop-types';
import crownSVG from '../../assets/crown.svg';

const PlayerListing = ({ data }) => {
  const { connected, name, totalScore, roundsPlayed, isGamemaster } = data;
  // const roundsWon = roundsPlayed.map();
  // const lastRound = roundsPlayed[roundsPlayed.length - 1].score; // ? umm yeah?

  return (
    <div className="playerListing">
      {/* <img /> the deck icon */}
      <h3 className="totalScore">{totalScore}</h3>
      <span className={`${connected ? 'is' : 'isNot'} connected`} />
      <h3 className="playerName">{name}</h3>
      <div>
        {/* {roundsWon && <p>Rounds won: {roundsWon}</p>}
        {lastRound && <p>Last Round Score: {lastRound}</p>} */}
      </div>
      {isGamemaster && (
        <img
          src={crownSVG}
          alt="gamemaster indicator"
          className="gamemasterIcon"
        />
      )}
    </div>
  );
};

PlayerListing.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PlayerListing;
