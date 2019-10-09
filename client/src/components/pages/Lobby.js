import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameData } from '../../redux/actions/game';
import { getPlayerData } from '../../redux/actions/player';

import Standings from '../lobby/Standings';
import Rounds from '../lobby/Rounds';

const Lobby = ({ isLoading, players, getGameData, getPlayerData }) => {
  useEffect(() => {
    getGameData(localStorage.gameId);
  }, []);

  console.log(players);

  if (players) {
    const playerData = players.find(p => p._id === localStorage.playerId);
    getPlayerData(playerData);
    console.log(playerData);
  }

  return (
    <div>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <div>
        <h2>Standings</h2>
        <h2>Rounds</h2>
      </div>
      <Standings />
      <Rounds />
      <button onClick={() => getGameData(localStorage.gameId)}>
        Update Game State
      </button>
    </div>
  );
};

Lobby.propTypes = {
  isLoading: PropTypes.bool,
  players: PropTypes.array,
  getGameData: PropTypes.func.isRequired,
  getPlayerData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.game.isLoading,
  players: state.game.players,
});

export default connect(
  mapStateToProps,
  { getGameData, getPlayerData }
)(Lobby);
