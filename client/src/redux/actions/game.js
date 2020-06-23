import axios from 'axios';
import { dispatch } from '../store';
import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAIL,
  SUBMIT_PLAYER_SCORE_SUCCESS,
  SUBMIT_PLAYER_SCORE_FAIL,
  END_GAME_SUCCESS,
  END_GAME_FAIL,
} from '../types';
import { getUserData } from './user';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const initializeState = () => {};

export const createGame = async formData => {
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

export const joinGame = async formData => {
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

export const getGameData = async gameId => {
  try {
    const { data } = await axios.get(`/api/games/${gameId}`);
    console.log(data);
    const gameData = {
      _id: data._id,
      currentRound: data.currentRound,
      endTime: data.endTime,
      expired: data.expired,
      hideScores: data.hideScores,
      maxNumberOfRounds: data.maxNumberOfRounds,
      password: data.password,
      startTime: data.startTime,
      title: data.title,
    };

    await dispatch({
      type: GET_GAME_DATA_SUCCESS,
      payload: gameData,
    });

    getUserData(data.players);
  } catch (error) {
    dispatch({
      type: GET_GAME_DATA_FAIL,
      payload: error,
    });
  }
};

export const submitPlayerScore = async actionData => {
  const { gameId, playerId, roundScore } = actionData;

  const body = JSON.stringify({ roundScore });

  try {
    const res = await axios.put(
      `/api/games/${gameId}/players/${playerId}/postScore`,
      body,
      config
    );

    const action = {
      type: SUBMIT_PLAYER_SCORE_SUCCESS,
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

export const endGame = async gameId => {
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
