import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitPlayerScore } from '../../redux/actions/game';
import ScoreForm from './ScoreForm';

const SubmitScore = ({ roundData, playerId, gameId, submitPlayerScore }) => {
  const [roundScore, setRoundScore] = useState(0);
  const { roundNumber } = roundData;

  const handleChange = e => {
    setRoundScore(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const actionData = { gameId, playerId, roundScore };
    submitPlayerScore(actionData);
  };

  return (
    <div id="submitScore">
      <h2>
        {playerId === roundData.winner
          ? `Congrats! You won round ${roundNumber}! Enter your score.`
          : `Enter score for round ${roundNumber}`}
      </h2>

      <ScoreForm
        roundScore={roundScore}
        setRoundScore={setRoundScore}
        handleSubmit={handleSubmit}
      />

      <button
        className="submitScoreBtn"
        type="submit"
        onClick={e => handleSubmit(e)}
      >
        Submit Score
      </button>
    </div>
  );
};

SubmitScore.propTypes = {
  roundData: PropTypes.object,
  playerId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  submitPlayerScore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  playerId: state.player._id,
  gameId: state.game._id,
});

export default connect(
  mapStateToProps,
  { submitPlayerScore }
)(SubmitScore);
