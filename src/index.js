/* eslint-disable no-undef */
import 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import LeaderBoardScene from './scenes/LeaderBoardScene';
import GameOverScene from './scenes/GameOverScene';
import Model from './model';
import { getScores } from './api';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

(async () => {
  const scores = await getScores();
  localStorage.setItem('ScoreBoard', JSON.stringify(scores));
})();

window.game = new Game();
