import { combineReducers } from 'redux';
import alert from './alert';
import game from './game';
import player from './player';
// import currentRound from './currentRound';

const rootReducer = combineReducers({
  alert,
  game,
  player,
  // currentRound,
});

export default rootReducer;
