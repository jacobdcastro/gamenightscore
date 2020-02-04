import axios from 'axios';
import {
  GET_PLAYER_DATA,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  SET_INIT_PLAYER_STATE,
  SET_INIT_PLAYER_STATE_FAIL,
  GM_CREATE_PLAYER_SUCCESS,
  GM_CREATE_PLAYER_FAIL,
} from '../types';
import store from '../store';
const { dispatch } = store;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getUserData = async players => {
  const userData = await players.find(p => p._id === localStorage.playerId);
};

export const setInitPlayerState = initData => async dispatch => {
  const { gameId, isGamemaster } = initData;

  const body = JSON.stringify({
    gameId,
    isGamemaster,
  });

  try {
    const res = await axios.post(`/api/games/auth/sign`, body, config);

    dispatch({
      type: SET_INIT_PLAYER_STATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_INIT_PLAYER_STATE_FAIL,
      payload: { msg: 'player state did not init' },
    });
  }
};

export const createPlayer = formData => async dispatch => {
  const { isGamemaster, gameId, name, gmCreated, deck } = formData;

  const body = JSON.stringify({
    isGamemaster,
    gameId,
    name,
    gmCreated,
    deck,
  });

  try {
    const res = await axios.post(
      `/api/games/${gameId}/newPlayer`,
      body,
      config
    );
    console.log(res);

    if (gmCreated) {
      dispatch({
        type: GM_CREATE_PLAYER_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: CREATE_PLAYER_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (gmCreated) {
      dispatch({
        type: GM_CREATE_PLAYER_FAIL,
        payload: error,
      });
    } else {
      dispatch({
        type: CREATE_PLAYER_FAIL,
        payload: error,
      });
    }
  }
};
