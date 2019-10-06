import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  GET_ALL_GAMES,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAthenticated: null,
  loading: true,
  game: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GAME_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload, // spread payload includes game + token
        isAuthenticated: true,
        loading: false,
      };
    case GET_ALL_GAMES:
      return [...state, payload];
    default:
      return state;
  }
}
