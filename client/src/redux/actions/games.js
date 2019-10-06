import axios from 'axios';

import {
  GET_ALL_GAMES,
  GET_GAMES_ERROR,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
} from './types';

export const createGame = formData => async dispatch => {
  const { title, password, maxNumberOfRounds, hideScores } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

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
    // dispatch({
    //   type: CREATE_GAME_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};
