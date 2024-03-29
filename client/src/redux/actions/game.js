import axios from 'axios';
import {
  // GET_ALL_GAMES,
  // GET_GAMES_ERROR,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_GAME_DATA,
  GET_GAME_DATA_FAIL,
  GET_PLAYER_DATA,
  SUBMIT_PLAYER_SCORE,
  SUBMIT_PLAYER_SCORE_FAIL,
  END_GAME_SUCCESS,
  END_GAME_FAIL,
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
    const res = await axios.post(`/api/games/new`, body, config);

    await dispatch({
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

    console.log(error);
  }
};

export const joinGame = formData => async dispatch => {
  const { title, password } = formData;

  const body = JSON.stringify({
    title,
    password,
  });

  try {
    const res = await axios.post(`/api/games/join`, body, config);

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
    const res = await axios.get(`/api/games/${gameId}`);

    await dispatch({
      type: GET_GAME_DATA,
      payload: res.data,
    });

    const playerData = await res.data.players.find(
      p => p._id === localStorage.playerId
    );

    dispatch({
      type: GET_PLAYER_DATA,
      payload: playerData,
    });
  } catch (error) {
    dispatch({
      type: GET_GAME_DATA_FAIL,
      payload: error,
    });
  }
};

export const submitPlayerScore = actionData => async dispatch => {
  const { gameId, playerId, roundScore } = actionData;

  const body = JSON.stringify({ roundScore });

  try {
    const res = await axios.put(
      `/api/games/${gameId}/players/${playerId}/postScore`,
      body,
      config
    );

    const action = {
      type: SUBMIT_PLAYER_SCORE,
      payload: res.data,
    };

    await dispatch(action);

    return res;
  } catch (error) {
    dispatch({
      type: SUBMIT_PLAYER_SCORE_FAIL,
      payload: error,
    });
    console.log(error);
  }
};

export const endGame = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${gameId}/endGame`);

    dispatch({
      type: END_GAME_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: END_GAME_FAIL,
      payload: error,
    });
    console.log(error);
  }
};
