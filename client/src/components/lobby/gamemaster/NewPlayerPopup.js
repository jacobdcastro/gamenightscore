import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPlayer } from '../../../redux/actions/player';
import xIcon from '../../../assets/x-icon.svg';

const NewPlayerPopup = ({ toggleNewPlayerPopup }) => {
  const [formData, setFormData] = useState({
    isGamemaster: false,
    gameId: localStorage.gameId,
    name: '',
    deck: '',
  });

  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer(formData);
  };

  return (
    <div className="createPlayerPopup">
      <div className="popupContainer">
        <img
          src={xIcon}
          title="exit new player popup"
          alt="exit new player popup"
          onClick={() => toggleNewPlayerPopup(false)}
        />

        <h1>Create New Player</h1>

        <form id="createPlayerForm" onSubmit={e => onSubmit(e)}>
          <div className="textInput">
            <label htmlFor="title">Player's Username</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Username"
              value={name}
              onChange={e => onChange(e)}
              required
            />
            <small>Choose the new player's name.</small>
          </div>

          <button type="submit">Add New Player</button>
        </form>
      </div>
    </div>
  );
};

NewPlayerPopup.propTypes = {
  toggleNewPlayerPopup: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createPlayer }
)(NewPlayerPopup);
