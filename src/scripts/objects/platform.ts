export default class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'platform')
    scene.add.existing(this)
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    (<Phaser.Physics.Arcade.Body>this.body).setAllowGravity(false)
  }
}
