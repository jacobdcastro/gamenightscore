import {
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  SET_INIT_PLAYER_STATE,
  SET_INIT_PLAYER_STATE_FAIL,
  GET_PLAYER_DATA,
  GM_CREATE_PLAYER_SUCCESS,
  GM_CREATE_PLAYER_FAIL,
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
      if (!payload.gmCreated) localStorage.setItem('playerId', payload._id);
      return {
        ...state,
        ...payload,
        token: localStorage.token,
        isCreated: true,
        loading: false,
        isAuthenticated: true,
      };
    case GM_CREATE_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_PLAYER_DATA:
      return {
        ...state,
        ...payload,
        token: localStorage.token,
        isCreated: true,
        loading: false,
        isAuthenticated: true,
      };
    case SET_INIT_PLAYER_STATE_FAIL:
    case GM_CREATE_PLAYER_FAIL:
    case CREATE_PLAYER_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    default:
      return state;
  }
}
