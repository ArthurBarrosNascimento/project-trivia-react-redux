import { SUCESS_REQUIRE, FAILURE_REQUIRE } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_REQUIRE:
    return {
      ...state,
      token: action.payload,
    };
  case FAILURE_REQUIRE:
    return {
      error: action.error,
    };
  default:
    return state;
  }
};

export default exampleReducer;
