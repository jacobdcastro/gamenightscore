import {
  GET_ALL_PLAYERS_SUCCESS,
  GET_ALL_PLAYERS_FAIL,
  GM_CREATE_PLAYER_SUCCESS,
  GM_CREATE_PLAYER_FAIL,
  GM_SUBMIT_USER_SCORE_SUCCESS,
  GM_SUBMIT_USER_SCORE_FAIL,
} from '../types';

const initialState = [];

export default function(state = initialState, action) {
  const players = action.payload;

  switch (action.type) {
    case GET_ALL_PLAYERS_SUCCESS:
    case GM_CREATE_PLAYER_SUCCESS:
    case GM_SUBMIT_USER_SCORE_SUCCESS:
      return [...state, ...players];

    case GET_ALL_PLAYERS_FAIL:
    case GM_CREATE_PLAYER_FAIL:
    case GM_SUBMIT_USER_SCORE_FAIL:
      return [...state];

    default:
      return state;
  }
}
