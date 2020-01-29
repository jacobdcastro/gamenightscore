import { combineReducers } from 'redux';
import alert from './alert';
import game from './game';
import player from './player';
import currentRound from './currentRound';
import popups from './popups';

const rootReducer = combineReducers({
  alert,
  game,
  player,
  currentRound,
  popups,
});

export default rootReducer;
