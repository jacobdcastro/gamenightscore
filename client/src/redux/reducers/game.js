import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_ALL_GAMES,
} from '../types';

const initialState = {
  loading: true,
  gameId: localStorage.getItem('gameId'),
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GAME_SUCCESS:
      localStorage.setItem('gameId', payload.game._id);
      return {
        ...state,
        ...payload, // spread payload includes game + token
        loading: false,
      };
    case JOIN_GAME_SUCCESS:
      localStorage.setItem('gameId', payload.game._id);
      return {
        ...state,
        ...payload, // spread payload includes game + token
        loading: false,
      };
    case CREATE_GAME_FAIL:
    case JOIN_GAME_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case GET_ALL_GAMES:
      return { ...state, payload, loading: false };
    default:
      return state;
  }
}
