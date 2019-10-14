import {
  GET_CURRENT_ROUND_DATA,
  // GET_CURRENT_ROUND_DATA_FAIL,
  // START_ROUND,
  // START_ROUND_FAIL,
  // END_ROUND,
  // END_ROUND_FAIL,
  // ADD_NEW_ROUND,
  // ADD_NEW_ROUND_FAIL,
} from '../types';

const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_ROUND_DATA:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    default:
      return state;
  }
}
