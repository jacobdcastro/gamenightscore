import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlayer } from '../../redux/actions/player';
import { getGameData } from '../../redux/actions/game';
import PropTypes from 'prop-types';

import { Paper, Container, TextField, Button } from '@material-ui/core';

// TODO add deck selection

import CreatePlayerWrapper from '../../styles/pages/CreatePlayer.sty.js';

const CreatePlayer = ({
  createPlayer,
  getGameData,
  gameId,
  isGamemaster,
  isCreated,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    isGamemaster,
    gameId,
    name: '',
    gmCreated: false,
    deck: '',
  });
  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('onSubmit() run');
    createPlayer(formData);
  };

  if (isAuthenticated && isCreated) {
    getGameData(localStorage.gameId);
    return <Redirect to="/lobby" />;
  }

  return (
    <Paper>
      <Container maxWidth="md">
        <CreatePlayerWrapper>
          <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
          <h2>Create your player!</h2>
          <p>
            If you're joining a game that's already begun, it's all good. You
            can still join!
          </p>

          <form id="createPlayerForm" onSubmit={e => onSubmit(e)}>
            <div className="inputDiv">
              <TextField
                required
                fullWidth={true}
                variant="outlined"
                id="name"
                name="name"
                label="Your Username"
                margin="normal"
                value={name}
                onChange={e => onChange(e)}
                helperText="How do you want to be known for this game?"
              />
            </div>
            <Button
              type="submit"
              className="joinGame"
              variant="contained"
              size="large"
              color="primary"
              fullWidth={true}
            >
              Enter Game Lobby
            </Button>
          </form>
        </CreatePlayerWrapper>
      </Container>
    </Paper>
  );
};

CreatePlayer.propTypes = {
  isAuthenticated: PropTypes.bool,
  isGamemaster: PropTypes.bool,
  isCreated: PropTypes.bool,
  gameId: PropTypes.string,
  createPlayer: PropTypes.func.isRequired,
  getGameData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.player.isAuthenticated,
  isGamemaster: state.player.isGamemaster,
  isCreated: state.player.isCreated,
  gameId: state.game._id,
  createPlayer,
  getGameData,
});

export default connect(
  mapStateToProps,
  { createPlayer, getGameData }
)(CreatePlayer);
