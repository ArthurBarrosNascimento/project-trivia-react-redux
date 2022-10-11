import { REQUEST_SCORE } from './index';

const requestScore = (payload) => ({
  type: REQUEST_SCORE,
  payload,
});

export default requestScore;
