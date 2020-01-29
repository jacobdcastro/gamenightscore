import {
  TOGGLE_INFO_POPUP,
  TOGGLE_NEW_PLAYER_POPUP,
  TOGGLE_END_GAME_POPUP,
  TOGGLE_PLAYER_SUBMIT_SCORE_POPUP,
} from '../types';

const initialState = {
  infoDialogIsOpen: false,
  newPlayerPopupIsOpen: false,
  endGamePopupIsOpen: false,
  playerSubmitScorePopupIsOpen: false,
};

export default function(state = initialState, action) {
  const { type, newState } = action;

  switch (type) {
    case TOGGLE_INFO_POPUP:
      return {
        ...state,
        infoDialogIsOpen: newState,
      };

    case TOGGLE_NEW_PLAYER_POPUP:
      return {
        ...state,
        newPlayerPopupIsOpen: newState,
      };

    case TOGGLE_END_GAME_POPUP:
      return {
        ...state,
        endGamePopupIsOpen: newState,
      };

    case TOGGLE_PLAYER_SUBMIT_SCORE_POPUP:
      return {
        ...state,
        playerSubmitScorePopupIsOpen: newState,
      };

    default:
      return state;
  }
}
