import PhaserLogo from "../phaserLogo";
import Ship from "../ships/Ship";

export default class Player {
  scene: Phaser.Scene;
  ship: Ship;
  controls:{
    thrustKey:Phaser.Input.Keyboard.Key,
    leftKey:Phaser.Input.Keyboard.Key,
    rightKey:Phaser.Input.Keyboard.Key,
    reverseKey:Phaser.Input.Keyboard.Key
  };

  constructor( {scene, x, y}) {
    this.scene = scene;

    this.ship = new Ship(scene, x , y);
  }

  
  preload() {
    //this.scene.load.atlas('flares', flaresPNG, flaresJSON);
    this.buildInputs();
    this.ship.preload();

  }

  create() {
    this.ship.create();
    this.scene.cameras.main.startFollow(this.ship).zoom = 2;
  }

  update() {

    if (this.controls.thrustKey.isDown) {
      this.ship.accelerate = true;
    } else {
      this.ship.accelerate = false;
    }
    if (this.controls.leftKey.isDown) {
      this.ship.angle -= 5;
    } else if (this.controls.rightKey.isDown) {
      this.ship.angle +=5;
    } else if (this.controls.reverseKey.isDown) {
      if (Phaser.Math.Fuzzy.GreaterThan(this.ship.body.velocity.length(), 1)) {
        let angle = Phaser.Math.Angle.Normalize(Phaser.Math.Angle.BetweenPoints({x:0,y:0},this.ship.body.velocity) - Phaser.Math.DEG_TO_RAD * 90);
        let shipAngle = Phaser.Math.Angle.Normalize(this.ship.rotation);

        if (Phaser.Math.Fuzzy.Equal(angle, shipAngle)) {
          this.ship.accelerate = true;
        } else {
          this.ship.rotation = Phaser.Math.Angle.RotateTo(shipAngle, angle, 0.05);
        }
      } else {
        this.ship.setVelocity(0,0);
      }
      
    }

    this.ship.update();

  }

  buildInputs() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    
    const { down, left, right, up, shift, space } = cursors;

    this.controls = {
      leftKey: left as Phaser.Input.Keyboard.Key,
      rightKey: right as Phaser.Input.Keyboard.Key,
      thrustKey: up as Phaser.Input.Keyboard.Key,
      reverseKey: down as Phaser.Input.Keyboard.Key
    }
  }

}