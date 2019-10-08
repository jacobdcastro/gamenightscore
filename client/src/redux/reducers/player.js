import {
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  SET_INIT_PLAYER_STATE,
  SET_INIT_PLAYER_STATE_FAIL,
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
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CREATE_PLAYER_SUCCESS:
      return {
        ...state,
        ...payload,
        isCreated: true,
        loading: false,
      };
    case SET_INIT_PLAYER_STATE_FAIL:
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
