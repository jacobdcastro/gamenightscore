import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitPlayerScore } from '../../../redux/actions/game';
import ScoreForm from '../ScoreForm';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const ScoreSubmission = ({
  playerId,
  players,
  currentRoundIsScored,
  currentRoundData,
  submitPlayerScore,
}) => {
  const [roundScore, setRoundScore] = useState(0);
  const [playerBeingScored, setPlayerBeingScored] = useState(playerId);
  let [index, setIndex] = useState(0);

  let gmCreatedPlayers = players.filter(p => p.gmCreated === true);

  // object is added to/manipulated in handle_()'s
  let actionData = {
    gameId: localStorage.gameId,
    playerId: playerBeingScored,
    roundScore,
  };

  const handleScoreSubmit = e => {
    e.preventDefault();
    actionData.roundScore = roundScore;
    submitPlayerScore(actionData);
    if (currentRoundIsScored && index < gmCreatedPlayers.length) {
      setIndex((index += 1));
    }
    if (index < gmCreatedPlayers.length) {
      setPlayerBeingScored(gmCreatedPlayers[index]._id);
    }
    setRoundScore(0);
  };

  return (
    <Fragment>
      <DialogTitle>
        {currentRoundIsScored && index < gmCreatedPlayers.length
          ? `Enter round ${currentRoundData.roundNumber} score for ${gmCreatedPlayers[index].name}.`
          : `Enter your score for round ${currentRoundData.roundNumber}`}
      </DialogTitle>

      <DialogContent>
        <ScoreForm roundScore={roundScore} setRoundScore={setRoundScore} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={e => handleScoreSubmit(e)}
        >
          Submit Score
        </Button>
      </DialogActions>
    </Fragment>
  );
};

ScoreSubmission.propTypes = {
  players: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  players: state.game.players,
  playerId: state.player._id,
});

export default connect(
  mapStateToProps,
  { submitPlayerScore }
)(ScoreSubmission);
