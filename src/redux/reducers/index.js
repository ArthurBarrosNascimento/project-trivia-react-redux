import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import userReducer from './user';

const rootReducer = combineReducers({
  exampleReducer,
  userReducer,
});

export default rootReducer;
