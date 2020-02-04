import {
  GET_ALL_GAMES_SUCCESS,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_GAME_DATA_SUCCESS,
  GET_GAME_DATA_FAIL,
  END_GAME_SUCCESS,
  END_GAME_FAIL,
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

    case GET_GAME_DATA_SUCCESS:
    case GET_ALL_GAMES_SUCCESS:
    case END_GAME_SUCCESS:
      return {
        ...gameData,
        loading: false,
      };

    case CREATE_GAME_FAIL:
    case JOIN_GAME_FAIL:
    case GET_GAME_DATA_FAIL:
    case END_GAME_FAIL:
      return {
        ...state,
        loading: false,
        error: gameData,
      };

    default:
      return state;
  }
}
