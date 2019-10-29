import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const InfoTab = ({ title, password, players, toggleInfoDialog }) => {
  const gamemaster = players.find(p => p.isGamemaster === true);
  return (
    <Fragment>
      <DialogTitle>Current Game Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Title:</b> {title}
        </DialogContentText>
        <DialogContentText>
          <b>Password:</b> {password}
        </DialogContentText>
        <DialogContentText>
          <b>Gamemaster:</b> {gamemaster.name}
        </DialogContentText>
        <DialogContentText>
          <b>Total Players:</b> {players.length}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          color="primary"
          onClick={e => toggleInfoDialog(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Fragment>
  );
};

InfoTab.propTypes = {
  title: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  toggleInfoDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  title: state.game.title,
  password: state.game.password,
  players: state.game.players,
});

export default connect(mapStateToProps)(InfoTab);
