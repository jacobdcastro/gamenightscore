import React from 'react';
import PropTypes from 'prop-types';
import crownSVG from '../../assets/crown.svg';
import { connect } from 'react-redux';

const PlayerListing = ({ pos, data, hideScores }) => {
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
      <h3 className="playerName">{name}</h3>
      <div>
        {/* {roundsWon && <p>Rounds won: {roundsWon}</p>}
        {lastRound && <p>Last Round Score: {lastRound}</p>} */}
      </div>
      <div className="totalScore">
        <span>Score:</span>
        <h3>{hideScores ? '???' : totalScore}</h3>
      </div>
    </div>
  );
};

PlayerListing.propTypes = {
  pos: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  hideScores: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  hideScores: state.game.hideScores,
});

export default connect(mapStateToProps)(PlayerListing);
