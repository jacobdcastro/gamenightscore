import React, { useState, useEffect } from 'react';
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
  const [allGmPlayersScored, setAllGmPlayersScored] = useState(false);
  const [playerBeingScored, setPlayerBeingScored] = useState(playerId);
  let [index, setIndex] = useState(0);

  let gmCreatedPlayers = players.filter(p => p.gmCreated === true);

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
    if (currentRoundIsScored && index < gmCreatedPlayers.length) {
      setIndex((index += 1));
    }
    if (index < gmCreatedPlayers.length) {
      setPlayerBeingScored(gmCreatedPlayers[index]._id);
    }
    setRoundScore(0);
  };

  return (
    <form onSubmit={e => handleScoreSubmit(e)}>
      <label htmlFor="scoreSubmission">
        {currentRoundIsScored && index < gmCreatedPlayers.length
          ? `Submit round ${currentRoundData.roundNumber} score for ${gmCreatedPlayers[index].name}.`
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
