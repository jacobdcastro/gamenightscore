import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerListing from './PlayerListing';

const Standings = ({ players, hideScores }) => {
  if (players) {
    return (
      <div id="standings">
        {players.map((player, index) => (
          <PlayerListing key={index} data={player} />
        ))}
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
};

Standings.propTypes = {
  players: PropTypes.array,
  hideScores: PropTypes.bool,
};

const mapStateToProps = state => ({
  players: state.game.players,
  hideScores: state.game.hideScores,
});

export default connect(mapStateToProps)(Standings);
