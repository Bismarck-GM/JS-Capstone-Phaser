/* eslint-disable no-undef */
import 'phaser';
import Entity from './Entities';

export default class EnemyChaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyMissile', 'ChaserShip');
    this.play('sprEnemyMissile');
    this.body.velocity.x = Phaser.Math.Between(-100, -200);
    this.states = {
      MOVE_LEFT: 'MOVE_LEFT',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_LEFT;
    this.update = () => {
      if (!this.getData('isDead') && this.scene.player) {
        if (Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.player.x,
          this.scene.player.y,
        ) < 520) {
          this.state = this.states.CHASE;
        }
        if (this.state === this.states.CHASE) {
          const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            this.scene.player.x,
            this.scene.player.y,
          );
          this.rotation = angle + 3.14;
          const speed = 150;
          this.body.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
          );
        }
      }
    };
  }
}