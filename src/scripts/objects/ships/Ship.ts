export default class Ship extends Phaser.Physics.Arcade.Sprite {

  _accelerating: boolean = false;
  _thrustEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene,x,y) {
    super(scene, x, y, 'ship');
  }

  preload() {
    this.scene.load.image('thrust', 'assets/particles/circle_05.png');
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
}