import 'phaser'
import MainScene from './scenes/main-scene'
import ScaleModes = Phaser.Scale.ScaleModes
import Center = Phaser.Scale.Center

const DEFAULT_WIDTH = 360
const DEFAULT_HEIGHT = 650

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  scale: {
    parent: 'phaser-game',
    mode: ScaleModes.FIT,
    autoCenter: Center.CENTER_HORIZONTALLY,
  },
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
  scene: [ MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 }
    },
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
