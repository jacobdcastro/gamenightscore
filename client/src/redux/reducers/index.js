import { combineReducers } from 'redux';
import alert from './alert';
import games from './games';

export default combineReducers({
  alert,
  games,
});
