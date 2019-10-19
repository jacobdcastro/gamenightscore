import axios from 'axios';
import {
  // GET_CURRENT_ROUND_DATA,
  // GET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
  SET_WINNER,
  SET_WINNER_FAIL,
  ADD_NEW_ROUND,
  ADD_NEW_ROUND_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const api_url = process.env.REACT_APP_API_URL;

// export const getCurrentRoundData = currentRoundData => async dispatch => {
//   console.log(currentRoundData);

//   try {
//     dispatch({
//       type: GET_CURRENT_ROUND_DATA,
//       payload: currentRoundData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const startRound = actionData => async dispatch => {
  const { gameId, startTime } = actionData;
  const body = JSON.stringify({ startTime });
  try {
    const res = await axios.put(
      `${api_url}/${gameId}/startRound`,
      body,
      config
    );
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

export const endRound = actionData => async dispatch => {
  const { gameId, endTime } = actionData;
  const body = JSON.stringify({ endTime });
  try {
    const res = await axios.put(`${api_url}/${gameId}/endRound`, body, config);
    dispatch({
      type: END_ROUND,
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

export const setWinner = actionData => async dispatch => {
  const { gameId, winnerId } = actionData;
  const body = JSON.stringify({ winnerId });
  try {
    const res = await axios.put(
      `${api_url}/${gameId}/setRoundWinner`,
      body,
      config
    );
    dispatch({
      type: SET_WINNER,
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

export const newRound = actionData => async dispatch => {
  const { gameId } = actionData;
  console.log('hi');
  try {
    const res = await axios.get(`${api_url}/${gameId}/newRound`, config);
    dispatch({
      type: ADD_NEW_ROUND,
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
