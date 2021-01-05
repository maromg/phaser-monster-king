export default class MainScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  ground: Phaser.GameObjects.Sprite;
  player: Phaser.GameObjects.Sprite;
  monkey: Phaser.GameObjects.Sprite;
  fire: Phaser.GameObjects.Sprite[];
  barrel: Phaser.GameObjects.Group;
  platforms: Phaser.GameObjects.Sprite[];
  RUNNING_SPEED = 200;
  JUMPING_SPEED = 550;

  constructor() {
    super({ key: 'MainScene' })
  }

  init() {

  }

  preload() {

  }

  create() {

  }

  update() {

  }
}
