import axios from 'axios';
import {
  // GET_ALL_GAMES,
  // GET_GAMES_ERROR,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  SET_INIT_PLAYER_STATE,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createGame = formData => async dispatch => {
  const { title, password, maxNumberOfRounds, hideScores } = formData;

  const body = JSON.stringify({
    title,
    password,
    maxNumberOfRounds,
    hideScores,
  });

  try {
    const res = await axios.post('/api/games/new', body, config);

    dispatch({
      type: CREATE_GAME_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_GAME_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const joinGame = (formData, isGamemaster) => async dispatch => {
  const { title, password } = formData;

  const body = JSON.stringify({
    title,
    password,
  });

  try {
    const res = await axios.post('/api/games/join', body, config);

    dispatch({
      type: JOIN_GAME_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOIN_GAME_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
