import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import xIcon from '../../assets/x-icon.svg';

const InfoTab = ({ title, password, players, toggleInfoTab }) => {
  console.log(players);
  const gamemaster = players.find(p => p.isGamemaster === true);
  console.log(gamemaster);
  return (
    <div className="infoTabWrapper">
      <div className="infoTab">
        <img
          src={xIcon}
          title="exit info tab"
          alt="exit info tab"
          onClick={() => toggleInfoTab(false)}
        />
        <h1>Title: {title}</h1>
        <h1>Password: {password}</h1>
        <h1>Gamemaster: {gamemaster.name}</h1>
        <h1>Total Players: {players.length}</h1>
      </div>
    </div>
  );
};

InfoTab.propTypes = {
  title: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  toggleInfoTab: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  title: state.game.title,
  password: state.game.password,
  players: state.game.players,
});

export default connect(mapStateToProps)(InfoTab);
