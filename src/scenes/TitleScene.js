/* eslint-disable no-undef */
import 'phaser';
import Button from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const backgroundImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
    const scaleX = this.cameras.main.width / backgroundImage.width;
    const scaleY = this.cameras.main.height / backgroundImage.height;
    const scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale).setScrollFactor(0);
    const form = document.getElementById('name-form');
    form.style.display = 'none';
    const scoreBoard = document.getElementById('score-board');
    scoreBoard.style.display = 'none';
    if (document.querySelector('table')) {
      document.querySelector('table').remove();
    }

    // Game
    this.gameButton = new Button(this, game.scale.width / 2, game.scale.height / 2 - 50, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, game.scale.width / 2, game.scale.height / 2 + 50, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, game.scale.width / 2, game.scale.height / 2 + 150, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    // LeaderBoard
    this.leaderboardButton = new Button(this, game.scale.width / 2, game.scale.height / 2 + 250, 'blueButton1', 'blueButton2', 'Leaderboard', 'LeaderBoard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.sys.game.globals.bgMusic = this.sound.add('bgMusic', { volume: 0.2, loop: true });
      this.sys.game.globals.bgMusic.play();
      this.model.bgMusicPlaying = true;
    }
  }
}
