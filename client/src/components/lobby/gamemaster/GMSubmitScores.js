import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitPlayerScore } from '../../../redux/actions/game';
import ScoreForm from '../ScoreForm';
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const GMSubmitScores = ({
  index,
  setIndex,
  playerBeingScored,
  submitPlayerScore,
  playersToScoreLength,
}) => {
  const [roundScore, setRoundScore] = useState(0);
  const playerId = playerBeingScored._id;

  // object is added to/manipulated in submitScore()'s
  let actionData = {
    gameId: localStorage.gameId,
  };

  const handleScoreSubmit = () => {
    actionData.playerId = playerId;
    actionData.roundScore = roundScore;
    submitPlayerScore(actionData);
    if (index + 1 === playersToScoreLength) setIndex(0);
    else setIndex(index + 1);
    setRoundScore(0);
  };

  return (
    <Fragment>
      <DialogTitle>
        {playerBeingScored.isGamemaster
          ? 'Enter your score'
          : `Enter score for ${playerBeingScored.name}`}
      </DialogTitle>
      <DialogContent>
        <ScoreForm roundScore={roundScore} setRoundScore={setRoundScore} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => handleScoreSubmit()}
        >
          Submit Score
        </Button>
      </DialogActions>
    </Fragment>
  );
};

GMSubmitScores.propTypes = {
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  playerBeingScored: PropTypes.object.isRequired,
  submitPlayerScore: PropTypes.func.isRequired,
};

export default connect(
  null,
  { submitPlayerScore }
)(GMSubmitScores);
