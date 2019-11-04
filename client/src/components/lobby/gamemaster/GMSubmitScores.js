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
  gmPlayerId,
  players,
  currentRoundIsScored,
  currentRoundData,
  allGmPlayersScoresSubmitted,
  submitPlayerScore,
}) => {
  const [roundScore, setRoundScore] = useState(0);
  const [playerBeingScored, setPlayerBeingScored] = useState();
  const [gmIsScored, setGmIsScored] = useState(false);
  let [index, setIndex] = useState(0);

  let gmCreatedPlayers = players.filter(p => p.gmCreated === true);

  // object is added to/manipulated in handle_()'s
  let actionData = {
    gameId: localStorage.gameId,
  };

  // TODO fix dumb score lifecycle breaking

  const submitGmScore = () => {
    actionData.playerId = gmPlayerId;
    actionData.roundScore = roundScore;
    submitPlayerScore(actionData);
    setGmIsScored(true);
    setPlayerBeingScored(gmCreatedPlayers[index]._id);
  };

  const submitCreatedPlayerScore = () => {
    actionData.playerId = playerBeingScored;
    actionData.roundScore = roundScore;
    submitPlayerScore(actionData);

    if (index + 1 < gmCreatedPlayers.length) {
      setIndex((index += 1));
      setPlayerBeingScored(gmCreatedPlayers[index]._id);
    }
  };

  const handleScoreSubmit = () => {
    if (gmIsScored && gmCreatedPlayers.length > 0) {
      submitCreatedPlayerScore();
    } else {
      submitGmScore();
    }

    setRoundScore(0);

    // reset state
    if (allGmPlayersScoresSubmitted) {
      setGmIsScored(false);
      setIndex(0);
    }
  };

  return (
    <Fragment>
      <DialogTitle>
        {gmIsScored && index < gmCreatedPlayers.length
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
  gmPlayerId: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundIsScored: PropTypes.bool.isRequired,
  allGmPlayersScoresSubmitted: PropTypes.bool.isRequired,
  currentRoundData: PropTypes.object,
  submitPlayerScore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.game.players,
  gmPlayerId: state.player._id,
});

export default connect(
  mapStateToProps,
  { submitPlayerScore }
)(GMSubmitScores);
