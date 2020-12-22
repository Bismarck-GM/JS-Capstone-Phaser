/* eslint-disable no-undef */
import 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;
    const centerScreenW = game.scale.width / 2;
    const centerScreenH = game.scale.height / 2;

    this.text = this.add.text(0, 0, 'Options', { fontSize: 40 });
    this.text.setPosition(centerScreenW - this.text.displayWidth / 2, centerScreenH - 200);

    this.musicText = this.add.text(0, 0, 'Music Enabled', { fontSize: 24 });
    this.musicText.setPosition(centerScreenW - this.musicText.displayWidth / 2, centerScreenH - 50);
    this.musicButton = this.add.image(centerScreenW, centerScreenH, 'checkedBox');
    this.musicButton.setPosition(centerScreenW + this.musicText.displayWidth, centerScreenH - 45);

    this.soundText = this.add.text(centerScreenW, centerScreenH, 'Sound Enabled', { fontSize: 24 });
    this.soundText.setPosition(centerScreenW - this.soundText.displayWidth / 2, centerScreenH + 50);
    this.soundButton = this.add.image(centerScreenW, centerScreenH, 'checkedBox');
    this.soundButton.setPosition(centerScreenW + this.soundText.displayWidth, centerScreenH + 55);

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();
    this.menuButton = new Button(this, centerScreenW, centerScreenH + 200, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}