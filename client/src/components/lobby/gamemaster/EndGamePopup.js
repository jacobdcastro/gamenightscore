import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPlayer } from '../../../redux/actions/player';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const EndGamePopup = ({ currentRoundId, rounds, toggleEndGamePopup }) => {
  const currentRound = rounds.find(r => r._id === currentRoundId);

  const confirmEnd = () => {
    // endGame action
  };

  return (
    <Fragment>
      <DialogTitle>Ending The Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you'd like to end the game after{' '}
          {currentRound.roundNumber} rounds?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          color="primary"
          onClick={() => toggleEndGamePopup(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={() => confirmEnd()}
        >
          End Game
        </Button>
      </DialogActions>
    </Fragment>
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
