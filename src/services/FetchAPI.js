const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

export const requestTokenAPI = async () => {
  const response = await fetch(URL_TOKEN);
  const object = await response.json();
  return object.token;
};

export const requestDataAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${URL_QUESTIONS}${token}`);
  const object = await response.json();
  return object.results;
};
