import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundListing from './RoundListing';
import RoundsWrapper from '../../styles/lobby/Rounds.sty.js';

const Rounds = ({ rounds, players }) => {
  return (
    <RoundsWrapper id="rounds">
      {rounds.map((round, index) => {
        return <RoundListing key={index} data={round} players={players} />;
      })}
    </RoundsWrapper>
  );
};

Rounds.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
  players: state.game.players,
});

export default connect(mapStateToProps)(Rounds);
