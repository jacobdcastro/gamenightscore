import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitPlayerScore } from "../../redux/actions/game";
import ScoreForm from "./ScoreForm";
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";

// TODO fix broken player submit form

const PlayerSubmitScore = ({
  roundData,
  playerId,
  gameId,
  submitPlayerScore
}) => {
  const [roundScore, setRoundScore] = useState(0);
  const { roundNumber } = roundData;

  const handleSubmit = e => {
    e.preventDefault();
    const actionData = { gameId, playerId, roundScore };
    submitPlayerScore(actionData);
  };

  return (
    <Fragment>
      <DialogTitle>
        {playerId === roundData.winner
          ? `Congrats! You won round ${roundNumber}! Enter your score.`
          : `Enter score for round ${roundNumber}`}
      </DialogTitle>

      <DialogContent>
        <ScoreForm roundScore={roundScore} setRoundScore={setRoundScore} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="submitScoreBtn"
          type="submit"
          onClick={e => handleSubmit(e)}
        >
          Submit Score
        </Button>
      </DialogActions>
    </Fragment>
  );
};

PlayerSubmitScore.propTypes = {
  roundData: PropTypes.object,
  playerId: PropTypes.string,
  gameId: PropTypes.string.isRequired,
  submitPlayerScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playerId: state.player._id,
  gameId: state.game._id
});

export default connect(mapStateToProps, { submitPlayerScore })(
  PlayerSubmitScore
);
