import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_ALL_GAMES,
  GET_GAME_DATA,
  // GET_GAME_DATA_FAIL,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
} from '../types';

const initialState = {
  loading: true,
};

export default function(state = initialState, action) {
  const gameData = action.payload;

  switch (action.type) {
    case CREATE_GAME_SUCCESS:
      localStorage.setItem('gameId', gameData._id);
      return {
        ...gameData,
        loading: false,
      };
    case JOIN_GAME_SUCCESS:
      localStorage.setItem('gameId', gameData._id);
      return {
        ...gameData,
        loading: false,
      };
    case CREATE_GAME_FAIL:
    case JOIN_GAME_FAIL:
      return {
        ...state,
        ...gameData,
        loading: false,
      };
    case GET_GAME_DATA:
    case GET_ALL_GAMES:
    case START_ROUND:
    case END_ROUND:
      return { ...gameData, loading: false };
    default:
      return state;
  }
}
