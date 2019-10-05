import React, { useState } from 'react';

const CreateGame = () => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
    maxNumberOfRounds: 1,
    hideScores: false,
  });
  const { title, password, maxNumberOfRounds, hideScores } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // perform redux action with axios request
  };

  return (
    <div id="createGamePage">
      <h1>Create a game.</h1>

      <form id="creatGameForm" onSubmit={e => onSubmit(e)}>
        <div>
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
        <div>
          <label htmlFor="password">Game password</label>
          <input
            id="password"
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
          />
          <small>
            Please use a password that isn't one you use on other accounts. It
            will be used for your friends to join the game and will be displayed
            on game dashboard.
          </small>
        </div>
        <div>
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
          />
          <small>Game will automatically end after this many rounds. </small>
        </div>
        <div>
          <label htmlFor="hideScores">Hide Scores?</label>
          <input
            id="hideScores"
            type="checkbox"
            name="hideScores"
            value={hideScores}
            onChange={e => onChange(e)}
          />
          <small>Scores will be hidden from players until end of game.</small>
        </div>
      </form>
    </div>
  );
};

export default CreateGame;
