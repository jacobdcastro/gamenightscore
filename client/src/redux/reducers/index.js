import { combineReducers } from 'redux';
import alerts from './alert';
import currentRound from './currentRound';
import game from './game';
import players from './players';
import popups from './popups';
import rounds from './rounds';
import user from './user';

const rootReducer = combineReducers({
  game,
  user,
  players,
  currentRound,
  rounds,
  alerts,
  popups,
});

export default rootReducer;
