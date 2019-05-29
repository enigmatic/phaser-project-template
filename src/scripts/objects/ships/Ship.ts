export default class Ship extends Phaser.Physics.Arcade.Sprite {

  _accelerating: boolean = false;
  _turnValue: integer = 0;
  _thrustEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  _fireTimer: integer = 0;

  constructor(scene, x, y) {
    super(scene, x, y, 'ship');
  }

  preload() {
    this.scene.load.image('thrust', 'assets/particles/circle_05.png');
    this.scene.load.image('playerFire', 'assets/spaceGame/laserGreen.png');
  }

  create() {
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.setCollideWorldBounds(true);

    var particles = this.scene.add.particles('thrust');

    this._thrustEmitter = particles.createEmitter({
        lifespan: {min: 500, max: 1000},
        speed: {min: 100, max: 200},
        followOffset: new Phaser.Math.Vector2(0, 50),
        scale: { start: 0.1, end: 0.0 },
        alpha: { start: 1.0, end: 0.0 },
        blendMode: 'ADD',
        angle: {min: 70, max: 110},
        follow: this
    });

  }

  update() {
    if (this._accelerating) {
      this._thrustEmitter.setAngle({min: this.angle + 70, max: this.angle + 110});
      this._thrustEmitter.followOffset = new Phaser.Math.Vector2(Phaser.Math.Rotate(new Phaser.Geom.Point(0, 50), this.rotation));
    }

    this.rotation += this._turnValue;

  }


  get accelerate():boolean {
    return this._accelerating;
  }

  set accelerate(value:boolean) {
    this._accelerating = value;
    if (value) {
      let p = Phaser.Math.Rotate(new Phaser.Geom.Point(0, -100), this.rotation);
      this.setAcceleration(p.x, p.y);
      this._thrustEmitter.start();
    } else {
      this.setAcceleration(0,0);
      this._thrustEmitter.stop();
    }
  }

  startTurnRight() {
    this._turnValue = 0.05;
  }

  startTurnLeft() {
    this._turnValue = -0.05;
  }

  stopTurning() {
    this._turnValue = 0;
  }

  reverse() {
    if (Phaser.Math.Fuzzy.GreaterThan(this.body.velocity.length(), 1)) {
      let angle = Phaser.Math.Angle.Normalize(Phaser.Math.Angle.BetweenPoints({x:0,y:0},this.body.velocity) - Phaser.Math.DEG_TO_RAD * 90);
      let shipAngle = Phaser.Math.Angle.Normalize(this.rotation);

      if (Phaser.Math.Fuzzy.Equal(angle, shipAngle)) {
        this.accelerate = true;
      } else {
        this.rotation = Phaser.Math.Angle.RotateTo(shipAngle, angle, 0.05);
      }
    } else {
      this._turnValue = 0;
      this.setVelocity(0,0);
    }
  }

  fire() {
    if (this._fireTimer === 0) {
      this._fireTimer = 500;
      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this._fireTimer = 0;
        },
        callbackScope: this
      });
      let bullet = this.scene.add.sprite(this.body.x, this.body.y, 'playerFire');
      this.scene.physics.add.existing(bullet);
      bullet.rotation = this.rotation;
      
      let p = Phaser.Math.RotateAround(new Phaser.Geom.Point(this.x, this.y - 50), this.x, this.y, this.rotation);
      bullet.setPosition(p.x, p.y);
      let v = Phaser.Math.Rotate(new Phaser.Geom.Point(0, -500), this.rotation);
      
      (bullet.body as Phaser.Physics.Arcade.Body).setVelocity(this.body.velocity.x + v.x, this.body.velocity.y + v.y);
    }
  }
}