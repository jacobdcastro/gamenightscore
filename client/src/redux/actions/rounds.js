import axios from 'axios';
import { dispatch } from '../store';
import {
  GET_ALL_ROUNDS_SUCCESS,
  GET_ALL_ROUNDS_FAIL,
  ADD_NEW_ROUND_SUCCESS,
  ADD_NEW_ROUND_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAllRounds = async rounds => {
  try {
    dispatch({
      type: GET_ALL_ROUNDS_SUCCESS,
      payload: rounds,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ROUNDS_FAIL,
      payload: error,
    });
  }
};

export const newRound = actionData => async dispatch => {
  const { gameId } = actionData;
  try {
    const res = await axios.get(`/api/games/${gameId}/newRound`, config);
    dispatch({
      type: ADD_NEW_ROUND_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEW_ROUND_FAIL,
      payload: error,
    });
    console.log(error);
  }
};
