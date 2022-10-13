import { ACTION_EMAIL, ACTION_NAME } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ACTION_EMAIL:
    return {
      ...state,
      email: payload,
    };
  case ACTION_NAME:
    return {
      ...state,
      name: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
