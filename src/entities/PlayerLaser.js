/* eslint-disable no-undef */
import 'phaser';
import Entity from './Entities';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPlayer');
    const angle = Phaser.Math.Angle.BetweenPoints(
      this,
      game.input.mousePointer,
    );
    this.scene.physics.velocityFromRotation(angle, 500, this.body.velocity);
    this.rotation = angle;
  }
}