import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPlayer } from '../../../redux/actions/player';

const EndGamePopup = ({ currentRoundId, rounds, toggleEndGamePopup }) => {
  const currentRound = rounds.find(r => r._id === currentRoundId);

  const confirmEnd = () => {
    // endGame action
  };

  return (
    <div className="endGamePopup">
      <div className="popupContainer">
        <h3>
          Are you sure you'd like to end the game after{' '}
          {currentRound.roundNumber} rounds?
        </h3>
        <button onClick={() => toggleEndGamePopup(false)}>Cancel</button>
        <button onClick={() => confirmEnd()}>End Game</button>
      </div>
    </div>
  );
};

EndGamePopup.propTypes = {
  toggleEndGamePopup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentRoundId: state.game.currentRound,
  rounds: state.game.rounds,
});

export default connect(
  mapStateToProps,
  { createPlayer }
)(EndGamePopup);
