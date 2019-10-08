import axios from 'axios';
import {
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  SET_INIT_PLAYER_STATE,
  SET_INIT_PLAYER_STATE_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const setInitPlayerState = initData => async dispatch => {
  const { gameId, isGamemaster } = initData;

  const body = JSON.stringify({
    gameId,
    isGamemaster,
  });

  try {
    const res = await axios.post('/api/games/auth', body, config);
    console.log(res.data);

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
  const { isGamemaster, gameId, name, pin } = formData;

  const body = JSON.stringify({
    isGamemaster,
    gameId,
    name,
    pin,
  });

  try {
    const res = await axios.post(
      `/api/games/${gameId}/newPlayer`,
      body,
      config
    );

    dispatch({
      type: CREATE_PLAYER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PLAYER_FAIL,
      payload: {
        error,
      },
    });
  }
};
