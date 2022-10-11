export const LOG_IN = 'LOG_IN';
export const REQUEST_SCORE = 'REQUEST_SCORE';
export const REQUEST_ASSERTIONS = 'REQUEST_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';

const requestLogin = (email, name) => ({
  type: LOG_IN,
  gravatarEmail: email,
  name,
});

export const requestScore = (payload) => ({
  type: REQUEST_SCORE,
  payload,
});

export const requestAssertions = () => ({
  type: REQUEST_ASSERTIONS,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export default requestLogin;
