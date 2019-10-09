import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlayer } from '../../redux/actions/player';
import { getGameData } from '../../redux/actions/game';
import PropTypes from 'prop-types';

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
    pin: '',
  });
  const { name, pin } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer(formData);
    console.log(formData);
  };

  if (isAuthenticated && isCreated) {
    getGameData(gameId);
    return <Redirect to="/lobby" />;
  }

  return (
    <CreatePlayerWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <p>Create your player!</p>
      <p>If you're joining a game that's already begun, you can still join.</p>

      <form id="joinGameForm" onSubmit={e => onSubmit(e)}>
        <div className="textInput">
          <label htmlFor="title">Title of Game</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <small>How do you want to be known?</small>
        </div>
        <div className="textInput">
          <label htmlFor="pin">Pin</label>
          <input
            id="pin"
            type="password"
            name="pin"
            placeholder="4-digit PIN"
            value={pin}
            onChange={e => onChange(e)}
            required
          />
          <small>
            If you leave the app, you can come back and sign back in using your
            pin!
          </small>
        </div>
        <button type="submit">Enter Game Lobby</button>
      </form>
    </CreatePlayerWrapper>
  );
};

CreatePlayer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isGamemaster: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  gameId: PropTypes.string.isRequired,
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
