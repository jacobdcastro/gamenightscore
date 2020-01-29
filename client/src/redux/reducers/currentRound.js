import {
  SET_CURRENT_ROUND_DATA,
  SET_CURRENT_ROUND_DATA_FAIL,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
  ADD_NEW_ROUND,
  ADD_NEW_ROUND_FAIL,
} from '../types';

const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ROUND_DATA:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case SET_CURRENT_ROUND_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
