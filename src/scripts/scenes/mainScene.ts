import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import { Scene } from 'phaser';

export default class MainScene extends Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {}

  create() {
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
    this.fpsText.update(this);
  }
}
//
