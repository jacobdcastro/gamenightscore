import React from 'react';
import PropTypes from 'prop-types';
import crownSVG from '../../assets/crown.svg';

const PlayerListing = ({ pos, data }) => {
  const { connected, name, totalScore, roundsPlayed, isGamemaster } = data;
  pos += 1;
  // const roundsWon = roundsPlayed.map();
  // const lastRound = roundsPlayed[roundsPlayed.length - 1].score; // ? umm yeah?
  return (
    <div className="playerListing">
      {/* <img /> the deck icon */}
      <div className="position">
        <h1>{pos}</h1>
      </div>
      <span className={`${connected ? 'is' : 'isNot'} connected`} />
      <h3 className="playerName">
        {name}
        {/* {isGamemaster && (
          <img
            src={crownSVG}
            alt="gamemaster indicator"
            className="gamemasterIcon"
          />
        )} */}
      </h3>
      <div>
        {/* {roundsWon && <p>Rounds won: {roundsWon}</p>}
        {lastRound && <p>Last Round Score: {lastRound}</p>} */}
      </div>
      <div className="totalScore">
        <span>Score:</span>
        <h3>{totalScore}</h3>
      </div>
    </div>
  );
};

PlayerListing.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PlayerListing;
