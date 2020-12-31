import Ground from '../objects/ground'
import Player from '../objects/player'
import Platform from '../objects/platform'
import Body = Phaser.Physics.Arcade.Body
import Monkey from '../objects/monkey'
import Fire from '../objects/fire'
import Barrel from '../objects/barrel'

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
    this.physics.world.setBounds(0,0,360,700);
    this.cameras.main.setBounds(0, 0, 360, 700);
  }

  preload() {
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('platform', 'assets/images/platform.png')
    this.load.image('goal', 'assets/images/gorilla3.png')
    this.load.image('barrel', 'assets/images/barrel.png')

    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
      frameWidth: 28,
      frameHeight: 30,
      spacing: 1,
      margin: 1
    })
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', {
      frameHeight: 20,
      frameWidth: 20,
      spacing: 0,
      margin: 1
    })
  }

  create() {
    this.ground = new Ground(this,0,700);
    this.player = new Player(this,0,600);
    this.barrel = this.add.group();
    this.anims.create({
      key: 'player',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 1] }),
      frameRate: 6,
    });
    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('fire', { frames: [0, 1] }),
      frameRate: 4,
      repeat: -1
    })
    this.platforms = [
      new Platform(this,0,100),
      new Platform(this,225,250),
      new Platform(this,0,400),
      new Platform(this,180,550)]

    this.fire = [
      new Fire(this, 150,75),
      new Fire(this, 200,375),
      new Fire(this, 100,525),
    ];
    this.monkey = new Monkey(this,0,60);


    this.fire.forEach(x => x.anims.play('fire', true));

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.barrel.add(new Barrel(this,0,60));
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        this.barrel.add(new Barrel(this,0,60));
      }
    });

  }

  update() {
    this.physics.collide(this.ground, this.player);
    this.physics.collide(this.player, this.platforms);
    this.physics.overlap(this.monkey, this.platforms);
    this.physics.collide(this.barrel,this.platforms);
    this.physics.collide(this.barrel,this.player, () => {
      this.scene.start('MainScene')
    });
    this.physics.collide(this.barrel,this.ground);
    this.physics.overlap(this.player, this.fire, () => {
      this.scene.start('MainScene');
    })
    this.physics.overlap(this.monkey, this.player, () => {
      alert('You win!');
      this.scene.start('MainScene');
    })


    this.barrel.children.each((gameObject) => {
      if (gameObject.body.position.x < 10 && gameObject.body.position.y > 600) {
        gameObject.destroy();
      }
    });


    this.player.body.velocity.x = 0;
    if (this.cursors.left?.isDown) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.setFlipX(false);
     this.player.anims.play('player',true);
    } else if (this.cursors.right?.isDown) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.setFlipX(true);
      this.player.anims.play('player',true);
    } else {
      this.player.anims.stop();
      this.player.setFlipX(false);
      this.player.setFrame(3);
    }
    if (this.cursors.up?.isDown && (<Body>this.player.body).touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    }
  }
}
