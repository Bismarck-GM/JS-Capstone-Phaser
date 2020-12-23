/* eslint-disable no-undef */
import 'phaser';
import { getScores } from '../api';
import Button from '../objects/button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    const centerScreenW = game.scale.width / 2;
    const centerScreenH = game.scale.height / 2;
    this.menuButton = new Button(this, centerScreenW, centerScreenH + 300, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
    const scoreBoardContainer = document.getElementById('score-board');
    scoreBoardContainer.style.display = 'flex';
    const loader = document.createElement('div');
    loader.classList.add('loader');
    scoreBoardContainer.append(loader);
    const h1 = document.querySelector('h1');

    (async () => {
      try {
        const apiScores = await getScores();
        loader.remove();
        localStorage.setItem('ScoreBoard', JSON.stringify(apiScores));
        h1.innerText = 'Scores';
        const scores = (JSON.parse(localStorage.getItem('ScoreBoard')).sort((a, b) => b.score - a.score).slice(0, 10));
        const table = document.createElement('table');
        table.classList.add('leaderboard');

        const headings = document.createElement('tr');
        const head1 = document.createElement('th');
        head1.innerText = 'RANK';
        const head2 = document.createElement('th');
        head2.innerText = 'SCORE';
        const head3 = document.createElement('th');
        head3.innerText = 'NAME';
        headings.append(head1, head2, head3);
        table.appendChild(headings);

        for (let i = 0; i < 10; i += 1) {
          const tr = document.createElement('tr');
          table.appendChild(tr);

          const td1 = document.createElement('td');
          td1.innerText = `${i + 1}`;
          const td2 = document.createElement('td');
          td2.innerText = `${scores[i].score}`;
          const td3 = document.createElement('td');
          td3.innerText = `${scores[i].user}`;
          tr.append(td1, td2, td3);
        }
        document.getElementById('score-board').append(table);
      } catch (error) {
        h1.innerText = 'Something went wrong :\'(';
        loader.remove();
      }
    })();
  }
}