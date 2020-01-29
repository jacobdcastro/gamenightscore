import {
  TOGGLE_INFO_POPUP,
  TOGGLE_NEW_PLAYER_POPUP,
  TOGGLE_END_GAME_POPUP,
  TOGGLE_PLAYER_SUBMIT_SCORE_POPUP,
} from '../types';

export const toggleInfoPopup = newState => dispatch => {
  dispatch({
    type: TOGGLE_INFO_POPUP,
    newState,
  });
};

export const toggleNewPlayerPopup = newState => dispatch => {
  dispatch({
    type: TOGGLE_NEW_PLAYER_POPUP,
    newState,
  });
};

export const toggleEndGamePopup = newState => dispatch => {
  dispatch({
    type: TOGGLE_END_GAME_POPUP,
    newState,
  });
};

export const togglePlayerSubmitScorePopup = newState => dispatch => {
  dispatch({
    type: TOGGLE_PLAYER_SUBMIT_SCORE_POPUP,
    newState,
  });
};
