import {
  SET_INIT_USER_STATE_SUCCESS,
  SET_INIT_USER_STATE_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  SUBMIT_USER_SCORE_SUCCESS,
  SUBMIT_USER_SCORE_FAIL,
} from '../types';

const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  const userData = action.payload;

  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case SET_INIT_USER_STATE_SUCCESS:
    case SUBMIT_USER_SCORE_SUCCESS:
      return {
        ...userData,
        loading: false,
      };

    case CREATE_USER_FAIL:
    case SET_INIT_USER_STATE_FAIL:
    case SUBMIT_USER_SCORE_FAIL:
      return {
        ...state,
        loading: false,
        error: userData,
      };

    default:
      return state;
  }
}
