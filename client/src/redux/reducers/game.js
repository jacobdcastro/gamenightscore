import {
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  GET_ALL_GAMES,
  GET_GAME_DATA,
  // GET_GAME_DATA_FAIL,
  END_GAME_SUCCESS,
  END_GAME_FAIL,
  START_ROUND,
  START_ROUND_FAIL,
  END_ROUND,
  END_ROUND_FAIL,
  ADD_NEW_ROUND,
  ADD_NEW_ROUND_FAIL,
  SET_WINNER,
  SET_WINNER_FAIL,
  SUBMIT_PLAYER_SCORE,
  SUBMIT_PLAYER_SCORE_FAIL,
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

    case GET_GAME_DATA:
    case GET_ALL_GAMES:
    case START_ROUND:
    case END_ROUND:
    case SET_WINNER:
    case ADD_NEW_ROUND:
    case SUBMIT_PLAYER_SCORE:
    case END_GAME_SUCCESS:
      return {
        ...gameData,
        loading: false,
      };

    case CREATE_GAME_FAIL:
    case JOIN_GAME_FAIL:
    case START_ROUND_FAIL:
    case END_ROUND_FAIL:
    case SET_WINNER_FAIL:
    case ADD_NEW_ROUND_FAIL:
    case SUBMIT_PLAYER_SCORE_FAIL:
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
