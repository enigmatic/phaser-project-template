import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import { Scene } from 'phaser';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

// @ts-ignore https://github.com/photonstorm/phaser/issues/4522
const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [new PreloadScene(), new MainScene()],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
};

window.addEventListener('load', () => {
  let game = new Phaser.Game(config);
});
//
