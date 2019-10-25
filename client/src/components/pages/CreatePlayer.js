import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlayer } from '../../redux/actions/player';
import { getGameData } from '../../redux/actions/game';
import PropTypes from 'prop-types';

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

  useEffect(() => {
    if (localStorage.gameId && localStorage.token) {
      getGameData(localStorage.gameId);
    }
  }, []);

  const { name, pin } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer(formData);
  };

  if (isAuthenticated && isCreated) {
    getGameData(gameId);
    return <Redirect to="/lobby" />;
  }

  return (
    <CreatePlayerWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <p>Create your player!</p>
      <p>
        If you're joining a game that's already begun, it's all good. You can
        still join!
      </p>

      <form id="createPlayerForm" onSubmit={e => onSubmit(e)}>
        <div className="textInput">
          <label htmlFor="title">Your Username</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <small>How do you want to be known for this game?</small>
        </div>
        <button type="submit">Enter Game Lobby</button>
      </form>
    </CreatePlayerWrapper>
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
