import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RoundLising from './RoundListing';

const Rounds = ({ rounds }) => {
  if (rounds) {
    return (
      <div id="rounds">
        {rounds.map((round, index) => (
          <RoundLising key={index} data={round} />
        ))}
      </div>
    );
  } else {
    return <h1>loading...</h1>;
  }
};

Rounds.propTypes = {
  rounds: PropTypes.array,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
});

export default connect(mapStateToProps)(Rounds);
