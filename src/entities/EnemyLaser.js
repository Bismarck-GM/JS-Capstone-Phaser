/* eslint-disable no-undef */
import 'phaser';
import Entity from './Entities';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0');
    this.body.velocity.x = -200;
    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.player.x,
      this.scene.player.y,
    );
    this.scene.physics.velocityFromRotation(angle, 200, this.body.velocity);
    this.rotation = angle;
  }
}