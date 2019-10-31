import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startRound,
  endRound,
  setWinner,
  newRound,
} from '../../../redux/actions/currentRound';
import ScoreSubmission from './ScoreSubmission';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Dialog from '@material-ui/core/Dialog';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: '#168f45',
  },
}));

const GamemasterFooter = ({
  rounds,
  players,
  currentRoundId,
  currentRoundIsScored,
  startRound,
  endRound,
  setWinner,
  newRound,
  toggleNewPlayerPopup,
  toggleEndGamePopup,
}) => {
  const [winner, setWinnerState] = useState('');
  const classes = useStyles();

  const currentRound = rounds.find(r => r._id === currentRoundId);
  const {
    roundNumber,
    inProgress,
    finished,
    allGmPlayersScoresSubmitted,
    allScoresSubmitted,
    newRoundReady,
  } = currentRound;

  // object is added to/manipulated in _RoundAction()'s
  let actionData = {
    gameId: localStorage.gameId,
  };

  const runStartRoundAction = () => {
    actionData.startTime = Date.now();
    startRound(actionData);
    console.log('Round Start!');
  };

  const runEndRoundAction = () => {
    endRound(actionData);
    console.log('Round Ended!');
  };

  const submitWinner = () => {
    actionData.winnerId = winner;
    setWinner(actionData);
    console.log(`${winner} has won!`);
  };

  const initNextRound = () => {
    newRound(actionData);
  };

  const handleSelectChange = e => {
    setWinnerState(e.target.value);
  };

  return (
    <Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {/* Add new player button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleNewPlayerPopup(true)}
          >
            <PersonAddIcon />
          </IconButton>

          {/* 1. Start Round Button */}
          {!inProgress && !finished && (
            <Fab
              size="large"
              color="primary"
              aria-label="start round"
              variant="extended"
              className={classes.fabButton}
              onClick={() => runStartRoundAction()}
            >
              <PlayArrowIcon /> Start Round {roundNumber}
            </Fab>
          )}

          {/* 2. End Round Button */}
          {inProgress && !finished && (
            <Fab
              size="large"
              color="primary"
              aria-label="end round"
              variant="extended"
              className={classes.fabButton}
              onClick={() => runEndRoundAction()}
            >
              <StopIcon /> End Round {roundNumber}
            </Fab>
          )}

          {/* 3. Select Winner Button */}
          <Dialog
            open={!inProgress && finished && !newRoundReady}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Select The Winner!</DialogTitle>
            <DialogContent>
              <FormControl component="fieldset">
                <FormLabel components="legend">Players</FormLabel>
                <RadioGroup
                  aria-label="all players"
                  name="players"
                  value={winner}
                  onChange={handleSelectChange}
                >
                  {players.map(p => (
                    <FormControlLabel
                      key={p._id}
                      value={p._id}
                      control={<Radio color="primary" />}
                      label={p.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => submitWinner()}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* ? 3.1. Let gamemaster submit their score here */}
          <Dialog
            open={currentRound.winner && !allGmPlayersScoresSubmitted}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <ScoreSubmission
              currentRoundIsScored={currentRoundIsScored}
              currentRoundData={currentRound}
            />
          </Dialog>

          {/* 4. Wait for all players to submit scores */}
          {newRoundReady && !allScoresSubmitted && (
            <Fab
              size="large"
              color="primary"
              aria-label="next round"
              variant="extended"
              className={classes.fabButton}
              disabled
            >
              Go To Next Round <ArrowForwardIosIcon />
            </Fab>
          )}

          {/* 5. Create/Go to next round */}
          {newRoundReady && allScoresSubmitted && (
            <Fab
              size="large"
              color="primary"
              aria-label="next round"
              variant="extended"
              className={classes.fabButton}
              onClick={() => initNextRound()}
            >
              Go To Next Round <ArrowForwardIosIcon />
            </Fab>
          )}

          <div className={classes.grow} />

          {newRoundReady && allScoresSubmitted ? (
            <Button
              className="endGameBtn"
              variant="contained"
              size="small"
              color="primary"
              onClick={() => toggleEndGamePopup(true)}
            >
              End Game
            </Button>
          ) : (
            <Button
              className="endGameBtn"
              variant="contained"
              size="small"
              disabled
            >
              End Game
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

GamemasterFooter.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  currentRoundId: PropTypes.string.isRequired,
  currentRoundIsScored: PropTypes.object,
  startRound: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  newRound: PropTypes.func.isRequired,
  toggleNewPlayerPopup: PropTypes.func.isRequired,
  toggleEndGamePopup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
  players: state.game.players,
  currentRoundId: state.game.currentRound,
});

export default connect(
  mapStateToProps,
  { startRound, endRound, setWinner, newRound }
)(GamemasterFooter);
