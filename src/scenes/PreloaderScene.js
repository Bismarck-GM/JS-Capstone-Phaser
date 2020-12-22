/* eslint-disable no-undef */
import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    const backgroundImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
    const scaleX = this.cameras.main.width / backgroundImage.width;
    const scaleY = this.cameras.main.height / backgroundImage.height;
    const scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale).setScrollFactor(0);

    // display progress bar
    const progressBox = this.add.graphics({
      x: scaleX + 120,
      y: 0,
      fillStyle: {
        color: 0x222222,
        alpha: 0.8,
      },
    });
    const progressBar = this.add.graphics({
      x: scaleX + 120,
      y: 0,
    });
    // progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 150,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 15,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('logo2', './assets/futurama.png');
    this.load.image('noHighScoreImg', './assets/gameoverimg.png');
    this.load.image('StarsBackground', './assets/star-bg.png');
    this.load.image('RedGiant', './assets/red-giant.png');
    this.load.image('Exoplanet', './assets/Exoplanet.png');
    this.load.image('blueButton1', './assets/ui/blue_button02.png');
    this.load.image('blueButton2', './assets/ui/blue_button03.png');
    this.load.image('orangeButton1', './assets/ui/orange_button02.png');
    this.load.image('orangeButton2', './assets/ui/orange_button03.png');
    this.load.image('box', './assets/ui/grey_box.png');
    this.load.image('checkedBox', './assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['./assets/futurama-full-theme.mp3']);
    this.load.audio('bgParanoid', ['./assets/paranoid.mp3']);
    this.load.spritesheet('newHighScoreImg', './assets/BenderNewScoreAnimation.png', {
      frameWidth: 709,
      frameHeight: 396,
    });
    this.load.spritesheet('nimbusEnemy', 'assets/Nimbus-Sprite.png', {
      frameWidth: 200,
      frameHeight: 148,
    });
    this.load.spritesheet('explosion', 'assets/exp2_0.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('sprEnemyMissile', 'assets/Missile.png', {
      frameWidth: 36,
      frameHeight: 16,
    });

    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', 'assets/Bessie.png', {
      frameWidth: 133,
      frameHeight: 42,
    });

    this.load.audio('sndExplode0', 'assets/explode3.wav');
    this.load.audio('sndExplode1', 'assets/explode4.wav');
    this.load.audio('sndExplode2', 'assets/explode5.wav');
    this.load.audio('sndLaser', 'assets/laserFire.wav');
  }

  create() {
    this.anims.create({
      key: 'newHighScoreImg',
      frames: this.anims.generateFrameNumbers('newHighScoreImg'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemyMissile',
      frames: this.anims.generateFrameNumbers('sprEnemyMissile'),
      frameRate: 40,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'nimbusEnemy',
      frames: this.anims.generateFrameNumbers('nimbusEnemy'),
      frameRate: 40,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
