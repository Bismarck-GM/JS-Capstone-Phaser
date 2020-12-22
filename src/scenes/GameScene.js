/* eslint-disable no-undef */
import 'phaser';
import Player from '../entities/Player';
import EnemyNimbus from '../entities/EnemyNimbus';
import EnemyChaser from '../entities/EnemyChaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true) {
      this.sys.game.globals.bgMusic.stop();
      this.sys.game.globals.bgMusic = this.sound.add('bgParanoid', { volume: 0.2, loop: true });
      this.sys.game.globals.bgMusic.play();
      this.model.bgMusicPlaying = true;
    }
    if (!this.game.input.keyboard.enabled) {
      this.game.input.keyboard.enabled = true;
    }
    const form = document.getElementById('name-form');
    form.style.display = 'none';

    this.input.setDefaultCursor('url(assets/red-Crosshair.cur), pointer');

    this.firstRound = undefined;
    this.secondRound = undefined;
    this.thirdRound = undefined;
    this.fourthRound = undefined;
    this.fifthRound = undefined;

    this.bg = this.add.tileSprite(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      'StarsBackground',
    ).setOrigin(0);
    const scaleX = this.cameras.main.width / this.bg.width;
    const scaleY = this.cameras.main.height / this.bg.height;
    const scale = Math.max(scaleX, scaleY);
    this.bg.setScale(scale).setScrollFactor(0);

    this.exoplanet = this.add.image(
      this.cameras.main.width + 1000,
      200,
      'Exoplanet',
    );
    this.exoplanet.setScale(scale / 2).setScrollFactor(0);

    this.redGiant = this.add.image(
      this.cameras.main.width,
      this.cameras.main.height,
      'RedGiant',
    );
    this.redGiant.setScale(scale / 1.5).setScrollFactor(0);

    this.score = 0;
    const scoreText = this.add.text(0, 0, 'Score:', { fontFamily: '"Roboto Condensed"', fontSize: '20px' });
    const lastScore = this.add.text(this.game.config.width - 200, 0, 'Last Score:', { fontFamily: '"Roboto Condensed"', fontSize: '20px' });
    lastScore.setText(`Last Score: ${JSON.parse(localStorage.getItem('lastScore'))}`);
    scoreText.setScale(scale).setScrollFactor(0);
    lastScore.setScale(scale).setScrollFactor(0);

    this.player = new Player(
      this,
      this.game.config.width * 0.1,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
    this.model = this.sys.game.globals.model;
    if (this.model.soundOn === true) {
      this.sfx = {
        explosions: [
          this.sound.add('sndExplode0', { volume: 0.06 }),
          this.sound.add('sndExplode1', { volume: 0.06 }),
          this.sound.add('sndExplode2', { volume: 0.06 }),
        ],
        laser: this.sound.add('sndLaser', { volume: 0.1 }),
      };
    } else {
      this.sfx = {
        explosions: [
          this.sound.add('sndExplode0', { volume: 0 }),
          this.sound.add('sndExplode1', { volume: 0 }),
          this.sound.add('sndExplode2', { volume: 0 }),
        ],
        laser: this.sound.add('sndLaser', { volume: 0 }),
      };
    }
    this.player.setScale(scale).setScrollFactor(0);


    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.on('pointerdown', () => {
      this.player.setData('isShooting', true);
    });

    this.input.on('pointerup', () => {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 0);
      this.player.setData('isShooting', false);
    });

    this.input.on('pointermove', (pointer) => {
      const angle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        pointer.worldX,
        pointer.worldY,
      );
      this.player.rotation = angle;
    }, this);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.nimbusSpawner = {
      delay: 1000,
      callback: () => {
        const enemy = new EnemyNimbus(
          this,
          this.game.config.width + 100,
          Phaser.Math.Between(50, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    };
    this.missileSpawner = {
      delay: 1000,
      callback: () => {
        const enemy = new EnemyChaser(
          this,
          this.game.config.width,
          Phaser.Math.Between(50, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    };

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        this.score += 5;
        scoreText.setText(`Score: ${this.score}`);
        playerLaser.destroy();
        this.time.addEvent({
          delay: 500,
          callback: () => {
            enemy.destroy();
          },
          loop: true,
        });
      }
    });
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
      && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
      }
    });
    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
      && !laser.getData('isDead')) {
        player.explode(false);
        laser.destroy();
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    // Score sets the event enemy spawners.
    if (this.firstRound === undefined) {
      this.firstRound = this.time.addEvent(this.nimbusSpawner);
    } else if (this.score > 250 && this.secondRound === undefined) {
      this.secondRound = this.time.addEvent(this.missileSpawner);
    } else if (this.score > 500 && this.thirdRound === undefined) {
      this.thirdRound = this.time.addEvent(this.nimbusSpawner);
    } else if (this.score > 1000 && this.fourthRound === undefined) {
      this.fourthRound = this.time.addEvent(this.missileSpawner);
    } else if (this.score > 1250 && this.fifthRound === undefined) {
      this.fifthRound = this.time.addEvent(this.missileSpawner);
    }

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }

      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }
    } else {
      localStorage.setItem('lastScore', JSON.stringify(this.score));
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
      this.game.input.keyboard.enabled = false;
      this.scene.start('GameOver');
    }

    this.bg.tilePositionX += 0.175;
    this.redGiant.x -= 0.4;
    this.exoplanet.x -= 0.6;
    // Delete enemies and lasers beyond world Boundaries.
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}