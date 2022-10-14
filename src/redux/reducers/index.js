import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import userReducer from './user';
import player from './player';

const rootReducer = combineReducers({
  exampleReducer,
  userReducer,
  player,
});

export default rootReducer;
