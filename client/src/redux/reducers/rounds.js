import {
  ADD_NEW_ROUND_SUCCESS,
  ADD_NEW_ROUND_FAIL,
  SET_CURRENT_ROUND_DATA_SUCCESS,
  SET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND_SUCCESS,
  START_ROUND_FAIL,
  END_ROUND_SUCCESS,
  END_ROUND_FAIL,
  SET_WINNER_SUCCESS,
  SET_WINNER_FAIL,
} from '../types';

const initialState = [];

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_NEW_ROUND_SUCCESS:
      state.push(payload);
      return state;

    case SET_CURRENT_ROUND_DATA_SUCCESS:
    case START_ROUND_SUCCESS:
    case END_ROUND_SUCCESS:
    case SET_WINNER_SUCCESS:
      return;

    case SET_CURRENT_ROUND_DATA_FAIL:
    case START_ROUND_FAIL:
    case END_ROUND_FAIL:
    case SET_WINNER_FAIL:
    case ADD_NEW_ROUND_FAIL:
      return state;

    default:
      return state;
  }
}
