import axios from 'axios';
import {
  GET_CURRENT_ROUND_DATA,
  // GET_CURRENT_ROUND_DATA_FAIL,
  // START_ROUND,
  // START_ROUND_FAIL,
  // END_ROUND,
  // END_ROUND_FAIL,
  // ADD_NEW_ROUND,
  // ADD_NEW_ROUND_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const setInitCurrentRoundState = initData => async dispatch => {
  const { currentRoundId } = initData;

  try {
    // todo
  } catch (error) {
    console.log(error);
  }
};
