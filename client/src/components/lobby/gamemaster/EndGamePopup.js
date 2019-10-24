import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPlayer } from '../../../redux/actions/player';
import xIcon from '../../../assets/x-icon.svg';

const EndGamePopup = ({ toggleEndGamePopup }) => {
  return (
    <div className="createPlayerPopup">
      <div className="popupContainer">
        <img
          src={xIcon}
          title="exit end game popup"
          alt="exit end game popup"
          onClick={() => toggleEndGamePopup(false)}
        />

        <button type="submit">Cancel</button>
        <button type="submit">End Game</button>
      </div>
    </div>
  );
};

EndGamePopup.propTypes = {
  toggleEndGamePopup: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createPlayer }
)(EndGamePopup);
