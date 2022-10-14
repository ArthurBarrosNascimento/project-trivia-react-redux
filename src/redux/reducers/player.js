import { ACTION_ASSERTIONS, ACTION_SCORE } from '../actions/index';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case ACTION_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
