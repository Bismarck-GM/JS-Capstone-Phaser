/* eslint-disable no-undef */
import 'phaser';
import Button from '../objects/button';
import { putScore } from '../api';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.input.setDefaultCursor('auto');
    const centerScreenW = game.scale.width / 2;
    const centerScreenH = game.scale.height / 2;
    this.text = this.add.text(0, 0, 'GAME OVER', { fontSize: 40 });
    this.text.setPosition(centerScreenW - this.text.displayWidth / 2, centerScreenH - 350);

    this.localScoreBoard = (JSON.parse(localStorage.getItem('ScoreBoard')).sort((a, b) => b.score - a.score).slice(0, 10));
    this.lastScore = JSON.parse(localStorage.getItem('lastScore'));
    const lastItem = this.localScoreBoard.slice(-1);
    if (lastItem[0].score >= this.lastScore) {
      this.gameOverImg = this.add.image(centerScreenW, centerScreenH - 150, 'noHighScoreImg');
      this.gameOverImg.setScale(0.5);
      this.text2 = this.add.text(0, 0, 'Boomer! You didn\'t reach a new high score!', { fontSize: 20 });
      this.text2.setPosition(centerScreenW - this.text2.displayWidth / 2, centerScreenH - 300);
      this.tryAgainButton = new Button(this, centerScreenW, centerScreenH + 50, 'blueButton1', 'blueButton2', 'Try Again', 'Game');
      this.menuButton = new Button(this, centerScreenW, centerScreenH + 150, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
    } else {
      this.gameOverImg = this.add.sprite(centerScreenW, centerScreenH - 150, 'newHighScoreImg').play('newHighScoreImg');
      this.gameOverImg.setScale(0.5);
      this.text2 = this.add.text(0, 0, 'Yay! A new High Score!', { fontSize: 20 });
      this.text2.setPosition(centerScreenW - this.text2.displayWidth / 2, centerScreenH - 300);

      // show form input
      const form = document.getElementById('name-form');
      form.style.display = 'flex';
      const input = document.getElementById('input-name');

      // create form button
      this.submitBtn = this.add.sprite(centerScreenW, centerScreenH + 100, 'orangeButton1').setInteractive();
      this.btntext = this.add.text(0, 0, 'Submit', { fontSize: '26px', fill: '#fff' });
      Phaser.Display.Align.In.Center(this.btntext, this.submitBtn);
      this.submitBtn.on('pointerover', () => {
        this.submitBtn.setTexture('orangeButton2');
      });
      this.submitBtn.on('pointerout', () => {
        this.submitBtn.setTexture('orangeButton1');
      });

      this.submitBtn.on('pointerdown', () => {
        if (input.value.length >= 3 && input.value.length <= 15) {
          putScore(input.value, this.lastScore);
          form.style.display = 'none';
          this.submitBtn.destroy();
          this.btntext.destroy();
          input.value = '';
          this.scene.start('LeaderBoard');
        } else {
          const errorParagraph = document.getElementById('bad-input');
          errorParagraph.style.display = 'block';
          input.value = '';
        }
      });

      this.tryAgainButton = new Button(this, centerScreenW, centerScreenH + 200, 'blueButton1', 'blueButton2', 'Try Again', 'Game');
      this.menuButton = new Button(this, centerScreenW, centerScreenH + 300, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
    }
  }
}