import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitPlayerScore } from '../../../redux/actions/game';
import ScoreForm from '../ScoreForm';

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
      <h3>
        {currentRoundIsScored && index < gmCreatedPlayers.length
          ? `Submit round ${currentRoundData.roundNumber} score for ${gmCreatedPlayers[index].name}.`
          : `Submit your score for round ${currentRoundData.roundNumber}`}
      </h3>

      <ScoreForm roundScore={roundScore} setRoundScore={setRoundScore} />

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
