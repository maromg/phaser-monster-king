export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'goal')
    scene.add.existing(this)
    scene.physics.add.existing(this);


    this.setCollideWorldBounds(true);
    (<Phaser.Physics.Arcade.Body>this.body).setAllowGravity(false).setImmovable();

  }
}
