import axios from 'axios';
import { dispatch } from '../store';
import {
  SET_INIT_USER_STATE_SUCCESS,
  SET_INIT_USER_STATE_FAIL,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  SUBMIT_USER_SCORE_SUCCESS,
  SUBMIT_USER_SCORE_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getUserData = async players => {
  const userData = await players.find(p => p._id === localStorage.playerId);
};

export const setInitPlayerState = async initData => {
  const { gameId, isGamemaster } = initData;

  const body = JSON.stringify({
    gameId,
    isGamemaster,
  });

  try {
    const res = await axios.post(`/api/games/auth/sign`, body, config);

    dispatch({
      type: SET_INIT_USER_STATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_INIT_USER_STATE_FAIL,
      payload: { msg: 'player state did not init' },
    });
  }
};

export const createPlayer = async formData => {
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
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error,
    });
  }
};
