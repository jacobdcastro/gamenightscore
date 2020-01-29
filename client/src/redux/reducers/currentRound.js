import {
  SET_CURRENT_ROUND_DATA,
  SET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
  SET_WINNER,
  SET_WINNER_FAIL,
  SUBMIT_PLAYER_SCORE,
  SUBMIT_PLAYER_SCORE_FAIL,
} from '../types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ROUND_DATA:
    case START_ROUND:
    case END_ROUND:
    case SET_WINNER:
    case SUBMIT_PLAYER_SCORE:
      return {
        ...state,
        ...payload,
      };

    case SET_CURRENT_ROUND_DATA_FAIL:
    case START_ROUND_FAIL:
    case END_ROUND_FAIL:
    case SET_WINNER_FAIL:
    case SUBMIT_PLAYER_SCORE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
