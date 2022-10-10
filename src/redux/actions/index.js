// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const SUCESS_REQUIRE = 'SUCESS_REQUIRE';
export const FAILURE_REQUIRE = 'FAILURE_REQUIRE';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const sucessRequire = (request) => ({
  type: SUCESS_REQUIRE,
  payload: request,
});

export const failureRequire = (error) => ({
  type: FAILURE_REQUIRE,
  error,
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
