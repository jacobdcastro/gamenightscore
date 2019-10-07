import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { joinGame } from '../../redux/actions/game';
import { setInitPlayerState } from '../../redux/actions/player';
import PropTypes from 'prop-types';

import JoinGameWrapper from '../../styles/pages/JoinGame.sty.js';

const JoinGame = ({ joinGame, setInitPlayerState, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
  });
  const { title, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    joinGame(formData);
    setInitPlayerState(false); // boolean value for isGamemaster
  };

  if (isAuthenticated) {
    return <Redirect to="/create-player" />;
  }

  return (
    <JoinGameWrapper>
      <Link className="backLink" to="/">
        &#8592; Back
      </Link>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <h1>Join a live game!</h1>
      <p>
        Ask the Gamemaster (player who created the game) for the game title and
        password. Title and password are displayed in game dashboard.
      </p>
      <form id="joinGameForm" onSubmit={e => onSubmit(e)}>
        <div className="textInput">
          <label htmlFor="title">Title of Game</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <small>
            Can be anything, to be honest. Your friends need it to login.
          </small>
        </div>
        <div className="textInput">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <small>
            Do not use a password you use on other accounts. It will displayed
            on game dashboard for others to see.
          </small>
        </div>
        <button type="submit">Create Game</button>
      </form>
    </JoinGameWrapper>
  );
};

JoinGame.propTypes = {
  joinGame: PropTypes.func.isRequired,
  setInitPlayerState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.player.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { joinGame, setInitPlayerState }
)(JoinGame);
