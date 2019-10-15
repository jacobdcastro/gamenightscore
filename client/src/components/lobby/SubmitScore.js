import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitPlayerScore } from '../../redux/actions/player';

const SubmitScore = ({ roundData, playerId, submitPlayerScore }) => {
  const [roundScore, setRoundScore] = useState(0);
  const { roundNumber } = roundData;

  const handleChange = e => {
    setRoundScore(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO add redux action for submitting player scores
    // submitPlayerScore()
  };

  return (
    <div id="submitScore">
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="scoreSubmission">
          {playerId === roundData.winner
            ? `Congrats! You won round ${roundNumber}! Submit your score.`
            : `Submit score for round ${roundNumber}`}
        </label>
        <input
          id="scoreSubmission"
          name="roundScore"
          type="number"
          value={roundScore}
          onChange={e => handleChange(e)}
        />
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};

SubmitScore.propTypes = {
  roundData: PropTypes.object,
  playerId: PropTypes.string.isRequired,
  submitPlayerScore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  playerId: state.player._id,
});

export default connect(
  mapStateToProps,
  { submitPlayerScore }
)(SubmitScore);
