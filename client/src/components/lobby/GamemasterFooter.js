import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { startRound, endRound } from '../../redux/actions/game';

const GamemasterFooter = ({ currentRound, rounds }) => {
  if (rounds) {
    let currentRoundData = rounds.find(r => r._id === currentRound);
    let start = true;

    let actionData = {
      time: null,
      gameId: localStorage.gameId,
    };

    const roundAction = () => {
      const time = Date.now();
      actionData = { time };
      if (start) {
        // startRound(actionData);
        console.log('Round Start!');
        start = false;
      } else {
        // endRound(actionData);
      }
    };

    return (
      <div id="gamemasterFooter">
        <button
          className={start ? 'startBtn' : 'endBtn'}
          onClick={() => roundAction()}
        >
          {start ? 'Start' : 'End'} Round
        </button>
      </div>
    );
  } else {
    return 'Loading...';
  }
};

GamemasterFooter.propTypes = {
  currentRound: PropTypes.string,
  rounds: PropTypes.array,
};

const mapStateToProps = state => ({
  currentRound: state.game.currentRound,
  rounds: state.game.rounds,
});

export default connect(mapStateToProps)(GamemasterFooter);
