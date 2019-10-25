import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitPlayerScore } from '../../../redux/actions/game';

const ScoreSubmission = ({
  playerId,
  players,
  currentRoundIsScored,
  currentRoundData,
  submitPlayerScore,
}) => {
  const [roundScore, setRoundScore] = useState(0);
  let [allGmPlayersScored, setAllGmPlayersScored] = useState(false);
  let [playerBeingScored, setPlayerBeingScored] = useState(playerId);

  let gmCreatedPlayers = players.filter(p => p.gmCreated === true);
  console.log(gmCreatedPlayers);

  // object is added to/manipulated in handle_()'s
  let actionData = {
    gameId: localStorage.gameId,
    playerId: playerBeingScored,
    roundScore,
  };

  const handleChange = e => {
    setRoundScore(e.target.value);
  };

  const handleScoreSubmit = e => {
    e.preventDefault();
    actionData.roundScore = roundScore;
    submitPlayerScore(actionData);
    if (currentRoundIsScored) i += 1;
    setRoundScore(0);
  };

  let i = 0;
  if (currentRoundIsScored) {
    setPlayerBeingScored(gmCreatedPlayers[i]._id);
    actionData.playerId = playerBeingScored;
  }

  return (
    <form onSubmit={e => handleScoreSubmit(e)}>
      <label htmlFor="scoreSubmission">
        {currentRoundIsScored
          ? `Submit round ${currentRoundData.roundNumber} score for ${gmCreatedPlayers[i].name}.`
          : `Submit your score for round ${currentRoundData.roundNumber}`}
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
