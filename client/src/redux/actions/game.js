import axios from 'axios';
import {
  // GET_ALL_GAMES,
  // GET_GAMES_ERROR,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_GAME_DATA,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
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
    // res expects game data
    const res = await axios.post('/api/games/new', body, config);

    dispatch({
      type: CREATE_GAME_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_GAME_FAIL,
      payload: {
        error,
      },
    });
  }
};

export const joinGame = formData => async dispatch => {
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

export const getGameData = gameId => async dispatch => {
  try {
    const res = await axios.get(`api/games/${gameId}`);

    dispatch({
      type: GET_GAME_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const startRound = actionData => async dispatch => {
  const { gameId, startTime } = actionData;
  const body = { startTime };
  try {
    const res = await axios.put(`/${gameId}/startRound`, body, config);
    dispatch({
      type: START_ROUND,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: START_ROUND_FAIL,
      payload: error,
    });
    console.log(error);
  }
};
