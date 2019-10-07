import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGame } from '../../redux/actions/game';
import { setInitPlayerState } from '../../redux/actions/player';
import PropTypes from 'prop-types';

import CreateGameWrapper from '../../styles/pages/CreateGame.sty';

// TODO why tf is there a token in there already?

const CreateGame = ({ createGame, setInitPlayerState, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
    maxNumberOfRounds: 1,
    hideScores: false,
  });
  const { title, password, maxNumberOfRounds, hideScores } = formData;

  const onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createGame(formData);
    setInitPlayerState(/* gameId for /api/auth jwt generation*/ true); // ! TODO boolean value for isGamemaster
  };

  if (isAuthenticated) {
    return <Redirect to="/create-player" />;
  }

  return (
    <CreateGameWrapper>
      <Link className="backLink" to="/">
        &#8592; Back
      </Link>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <h1>Create a new game!</h1>
      <p>
        Once you create this game, it will be live on the server for players to
        join in!
      </p>
      <p>
        Other people will need the game title and password to join. Make it
        easy, memorable, and sharable.
      </p>

      <form id="createGameForm" onSubmit={e => onSubmit(e)}>
        <div className="textInput">
          <label htmlFor="title">Title of Game</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => onChange(e)}
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
        <div className="numInput">
          <label htmlFor="maxNumberOfRounds">How many rounds?</label>
          <input
            id="maxNumberOfRounds"
            type="number"
            name="maxNumberOfRounds"
            placeholder="Max. Rounds"
            value={maxNumberOfRounds}
            onChange={e => onChange(e)}
            min="1"
            max="50"
            size="2"
          />
          <small>Game will automatically end after this many rounds. </small>
        </div>
        <div className="checkInput">
          <div className="container">
            <input
              id="hideScores"
              type="checkbox"
              name="hideScores"
              checked={hideScores}
              onChange={e => onChange(e)}
            />
            <span class="checkmark"></span>
            <label htmlFor="hideScores">Hide Scores?</label>
          </div>
          <small>
            If checked, scores will be hidden from players until end of game.
          </small>
        </div>
        <button type="submit">Create Game</button>
      </form>
    </CreateGameWrapper>
  );
};

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  setInitPlayerState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.player.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { createGame, setInitPlayerState }
)(CreateGame);
