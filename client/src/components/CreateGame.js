import React from 'react';

const CreateGame = () => {
  const onSubmit = () => {
    // send form data with axios
  };

  return (
    <div id="createGamePage">
      <h1>Create a game.</h1>

      <form id="creatGameForm" onSubmit={e => onSubmit(e)}>
        <div>
          <label htmlFor="name">Name of Game</label>
          <input id="name" />
          <span>
            Can be anything, to be honest. Your friends need it to login.
          </span>
        </div>
        <div>
          <label htmlFor="password">Game password</label>
          <input id="password" />
          <span>
            Please use a password that isn't one you use on other accounts. It
            will be used for your friends to join the game and will be displayed
            on game dashboard.
          </span>
        </div>
        <div>
          <label htmlFor="maxNumberOfRounds">Name of Game</label>
          <input id="maxNumberOfRounds" />
          <span>Game will automatically end after this many rounds. </span>
        </div>
        <div>
          <label htmlFor="hideScores">Hide Scores?</label>
          <input id="hideScores" />
          <span>Scores will be hidden from players until end of game.</span>
        </div>
      </form>
    </div>
  );
};

export default CreateGame;
