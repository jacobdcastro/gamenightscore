import {
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  SET_INIT_PLAYER_STATE,
} from '../types';

const initialState = {
  token: null,
  isAuthenticated: null,
  isGamemaster: null,
  isCreated: false,
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_INIT_PLAYER_STATE:
      return {
        ...state,
        ...payload,
        token: localStorage.getItem('token'),
        isAuthenticated: localStorage.getItem('token') ? true : false,
      };
    case CREATE_PLAYER_SUCCESS:
      localStorage.setItem('gameId', payload.game._id);
      return {
        ...state,
        ...payload,
        isCreated: true,
        loading: false,
      };
    case CREATE_PLAYER_FAIL:
      return {
        ...state,
        ...payload,
        isCreated: false,
        loading: false,
      };
    default:
      return state;
  }
}
