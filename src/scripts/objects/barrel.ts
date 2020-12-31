export default class Barrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'barrel')

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true);
    (<Phaser.Physics.Arcade.Body>this.body).setAllowGravity(true).setImmovable(false).setVelocityX(200).setBounce(1,0);
  }
}

