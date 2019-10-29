import React from 'react';
import PropTypes from 'prop-types';
import ScoreFormWrapper from '../../styles/lobby/ScoreForm.sty.js';
import Button from '@material-ui/core/Button';

const ScoreForm = ({ roundScore, setRoundScore }) => {
  return (
    <ScoreFormWrapper className="scoreForm">
      <div className="editBtns subBtns">
        <Button
          variant="contained"
          size="large"
          className="sub1"
          onClick={() => setRoundScore(roundScore - 1)}
        >
          -1
        </Button>
        <Button
          variant="contained"
          size="large"
          className="sub5"
          onClick={() => setRoundScore(roundScore - 5)}
        >
          -5
        </Button>
        <Button
          variant="contained"
          size="large"
          className="sub10"
          onClick={() => setRoundScore(roundScore - 10)}
        >
          -10
        </Button>
      </div>

      <div className="number">{roundScore}</div>

      <div className="editBtns addBtns">
        <Button
          variant="contained"
          size="large"
          className="add1"
          onClick={() => setRoundScore(roundScore + 1)}
        >
          +1
        </Button>
        <Button
          variant="contained"
          size="large"
          className="add5"
          onClick={() => setRoundScore(roundScore + 5)}
        >
          +5
        </Button>
        <Button
          variant="contained"
          size="large"
          className="add10"
          onClick={() => setRoundScore(roundScore + 10)}
        >
          +10
        </Button>
      </div>
    </ScoreFormWrapper>
  );
};

ScoreForm.propTypes = {
  roundScore: PropTypes.number.isRequired,
  setRoundScore: PropTypes.func.isRequired,
};

export default ScoreForm;
