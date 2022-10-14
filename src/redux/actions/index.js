// export const LOG_IN = 'LOG_IN';
export const REQUEST_SCORE = 'REQUEST_SCORE';
export const REQUEST_ASSERTIONS = 'REQUEST_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';
export const SUCESS_REQUIRE = 'SUCESS_REQUIRE';
export const FAILURE_REQUIRE = 'FAILURE_REQUIRE';
export const HANDLE_CORRECT = 'HANDLE_CORRECT';
export const ACTION_EMAIL = 'ACTION_EMAIL';
export const ACTION_NAME = 'ACTION_NAME';
export const ACTION_ASSERTIONS = 'ACTION_ASSERTIONS';
export const ACTION_SCORE = 'ACTION_SCORE';

// const requestLogin = (email, name) => ({
//   type: LOG_IN,
//   gravatarEmail: email,
//   name,
// });

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

export const emailAction = (payload) => ({
  type: ACTION_EMAIL,
  payload,
});

export const nameAction = (payload) => ({
  type: ACTION_NAME,
  payload,
});

// export default requestLogin;

export const sucessRequire = (request) => ({
  type: SUCESS_REQUIRE,
  payload: request,
});

export const failureRequire = (error) => ({
  type: FAILURE_REQUIRE,
  error,
});

export const handleCorrect = (correct) => ({
  type: HANDLE_CORRECT,
  correct,
});

export const ActionAssertions = (payload) => ({
  type: ACTION_ASSERTIONS,
  payload,
});

export const ActionScore = (payload) => ({
  type: ACTION_SCORE,
  payload,
});

export function fecthIsRequired() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://opentdb.com/api_token.php?command=request')
        .then((requestApi) => requestApi.json());
      return dispatch(sucessRequire(request.token));
    } catch (error) {
      return dispatch(failureRequire(error));
    }
  };
}
