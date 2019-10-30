import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { endGame } from '../../../redux/actions/game';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const EndGamePopup = ({
  gameId,
  currentRoundId,
  rounds,
  toggleEndGamePopup,
  endGame,
}) => {
  const currentRound = rounds.find(r => r._id === currentRoundId);

  const confirmEnd = () => {
    console.log('ended...');
    endGame(gameId);
  };

  return (
    <Fragment>
      <DialogTitle>Ending The Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you'd like to end the game after{' '}
          {currentRound.roundNumber} round{currentRound.roundNumber > 1 && 's'}?
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
  gameId: PropTypes.string.isRequired,
  currentRoundId: PropTypes.string.isRequired,
  rounds: PropTypes.array.isRequired,
  toggleEndGamePopup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  gameId: state.game._id,
  currentRoundId: state.game.currentRound,
  rounds: state.game.rounds,
});

export default connect(
  mapStateToProps,
  { endGame }
)(EndGamePopup);
