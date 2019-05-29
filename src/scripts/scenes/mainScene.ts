import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import { Scene } from 'phaser';
import Player from '../objects/player/Player';

export default class MainScene extends Scene {
  fpsText: Phaser.GameObjects.Text;
  player: Player;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.player = new Player({scene: this, x:640, y:360})

    this.player.preload();
  }

  create() {
    
    this.player.create();
    new PhaserLogo(this, this.cameras.main.width / 2, 0);
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#FFFFFF',
        fontSize: 24
      })
      .setOrigin(1, 0);
  }

  update() {
    this.player.update();
    this.fpsText.update(this);
  }
}
//
