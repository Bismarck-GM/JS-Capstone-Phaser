import 'regenerator-runtime';

const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/UY5uHeKRocCxL8RC5wvX/scores/';

export const putScore = async (user, score) => {
  const body = JSON.stringify({ user, score });
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  };
  const response = await fetch(URL, data);
  const result = await response.json();
  return result;
};

export const getScores = async () => {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
  };
  const response = await fetch(URL, data);
  const scores = await response.json();
  return scores.result;
};