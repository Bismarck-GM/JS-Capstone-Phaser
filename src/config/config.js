/* eslint-disable no-undef */
import 'phaser';

export default {
  type: Phaser.AUTO,
  size: {
    width: 1280,
    height: 720,
  },
  scale: {
    mode: Phaser.DOM.ENVELOP,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    parent: 'phaser-app',
    dom: {
      createContainer: true,
    },
    min: {
      width: 1024,
      height: 720,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};