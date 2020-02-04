import {
  SET_CURRENT_ROUND_DATA_SUCCESS,
  SET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND_SUCCESS,
  START_ROUND_FAIL,
  END_ROUND_SUCCESS,
  END_ROUND_FAIL,
  SET_WINNER_SUCCESS,
  SET_WINNER_FAIL,
  SUBMIT_PLAYER_SCORE_SUCCESS,
  SUBMIT_PLAYER_SCORE_FAIL,
} from '../types';

const initialState = {};

export default function(state = initialState, action) {
  const currentRoundData = action.payload;

  switch (action.type) {
    case SET_CURRENT_ROUND_DATA_SUCCESS:
    case START_ROUND_SUCCESS:
    case END_ROUND_SUCCESS:
    case SET_WINNER_SUCCESS:
    case SUBMIT_PLAYER_SCORE_SUCCESS:
      return {
        ...state,
        ...currentRoundData,
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
