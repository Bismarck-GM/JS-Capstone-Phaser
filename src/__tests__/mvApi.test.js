import { putScore, getScores } from '../api';

describe('The scores and usernames should be written and read from the API', () => {
  test('Should save the score to the API', () => {
    putScore('Bender', 500).then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    });
  });
  test('Should receive an object from the API', () => {
    getScores().then(data => {
      expect(typeof data).toBe('object');
    });
  });
  test('The object should contain the created user', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Bender',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
  test('The object should contain the created score', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '500',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
});