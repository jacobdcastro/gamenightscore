import axios from 'axios';
import { dispatch, getState } from '../store';
import {
  SET_CURRENT_ROUND_DATA_SUCCESS,
  SET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND_SUCCESS,
  START_ROUND_FAIL,
  END_ROUND_SUCCESS,
  END_ROUND_FAIL,
  SET_WINNER_SUCCESS,
  SET_WINNER_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const state = getState();
console.log(state);

export const setCurrentRoundData = async roundId => {
  try {
    const roundData = dispatch({
      type: SET_CURRENT_ROUND_DATA_SUCCESS,
      payload: roundData,
    });
  } catch (error) {
    dispatch({
      type: SET_CURRENT_ROUND_DATA_FAIL,
      payload: roundData,
    });
  }
};

export const startRound = async actionData => {
  const { gameId, startTime } = actionData;
  const body = JSON.stringify({ startTime });
  try {
    const res = await axios.put(
      `/api/games/${gameId}/startRound`,
      body,
      config
    );
    dispatch({
      type: START_ROUND_SUCCESS,
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

export const endRound = async actionData => {
  const { gameId, endTime } = actionData;
  const body = JSON.stringify({ endTime });
  try {
    const res = await axios.put(`/api/games/${gameId}/endRound`, body, config);
    dispatch({
      type: END_ROUND_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: END_ROUND_FAIL,
      payload: error,
    });
    console.log(error);
  }
};

export const setWinner = async actionData => {
  const { gameId, winnerId } = actionData;
  const body = JSON.stringify({ winnerId });
  try {
    const res = await axios.put(
      `/api/games/${gameId}/setRoundWinner`,
      body,
      config
    );
    dispatch({
      type: SET_WINNER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_WINNER_FAIL,
      payload: error,
    });
    console.log(error);
  }
};
