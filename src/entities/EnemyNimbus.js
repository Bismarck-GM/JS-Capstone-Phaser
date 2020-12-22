/* eslint-disable no-undef */
import 'phaser';
import Entity from './Entities';
import EnemyLaser from './EnemyLaser';

export default class EnemyNimbus extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'nimbusEnemy', 'ChaserShip');
    this.play('nimbusEnemy');
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const laser = new EnemyLaser(
          this.scene,
          this.x - 100,
          this.y + 12,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.onDestroy = () => {
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
    };
  }
}