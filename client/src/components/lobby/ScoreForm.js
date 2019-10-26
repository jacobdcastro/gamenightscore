import React from 'react';
import PropTypes from 'prop-types';
import ScoreFormWrapper from '../../styles/lobby/ScoreForm.sty.js';

const ScoreForm = ({ roundScore, setRoundScore }) => {
  return (
    <ScoreFormWrapper className="scoreForm">
      <div className="editBtns subBtns">
        <button className="sub1" onClick={() => setRoundScore(roundScore - 1)}>
          -1
        </button>
        <button className="sub5" onClick={() => setRoundScore(roundScore - 5)}>
          -5
        </button>
        <button
          className="sub10"
          onClick={() => setRoundScore(roundScore - 10)}
        >
          -10
        </button>
      </div>

      <div className="number">{roundScore}</div>

      <div className="editBtns addBtns">
        <button className="add1" onClick={() => setRoundScore(roundScore + 1)}>
          +1
        </button>
        <button className="add5" onClick={() => setRoundScore(roundScore + 5)}>
          +5
        </button>
        <button
          className="add10"
          onClick={() => setRoundScore(roundScore + 10)}
        >
          +10
        </button>
      </div>
    </ScoreFormWrapper>
  );
};

ScoreForm.propTypes = {
  roundScore: PropTypes.number.isRequired,
  setRoundScore: PropTypes.func.isRequired,
};

export default ScoreForm;
