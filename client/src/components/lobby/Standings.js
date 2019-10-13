import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerListing from './PlayerListing';
import StandingsWrapper from '../../styles/lobby/Standings.sty.js';

const Standings = ({ players, hideScores }) => {
  return (
    <StandingsWrapper id="standings">
      {players.map((player, index) => (
        <PlayerListing key={index} data={player} pos={index} />
      ))}
    </StandingsWrapper>
  );
};

Standings.propTypes = {
  players: PropTypes.array.isRequired,
  hideScores: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  players: state.game.players,
  hideScores: state.game.hideScores,
});

export default connect(mapStateToProps)(Standings);
