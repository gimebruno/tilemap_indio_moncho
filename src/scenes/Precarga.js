export default class Precarga extends Phaser.Scene {
  // escena para optimiozar tiempos
  // carga el preload solo una vez y sirve para todo el juego
  constructor() {
    // key of the scene
    super("precarga");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
    this.load.tilemapTiledJSON("map2", "./public/tilemaps/nivel2.json");
    this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel4.json");
    this.load.image("tilesFondo", "./public/images/sky.png");
    this.load.image("tilesPlataforma", "./public/images/platform.png");
    this.load.image("restartB", "./public/images/restartButton.png");
    this.load.image("inicioB", "./public/images/startButton.png");
    this.load.image("titulo","./public/images/Title.png");
    this.load.audio("music1", "./public/music/music-level1.mp3");
    this.load.audio("music2", "./public/music/music-level2.mp3");
    this.load.audio("music3", "./public/music/music-level3.mp3");
    this.load.audio("victory","./public/music/victory.mp3")
    this.load.image("star", "./public/images/star.png");
    this.load.spritesheet("dudeD", "./public/images/dudedance.png", {
      frameWidth: 256,
      frameHeight: 256,
    })
    this.load.spritesheet("dude", "./public/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet("enemy","./public/images/enemy.png", {
      frameWidth: 54,
      frameHeight: 46,
    })
    this.load.spritesheet("enemy2", "./public/images/enemy2.png", {
      frameWidth: 47,
      frameHeight: 48,
    })
    this.load.image("salida", "./public/images/salida.png");
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    // se crea una sola vez, para que no de error en el restart de la escena
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });   
    this.anims.create({
      key: 'dudeDance',
      frames: this.anims.generateFrameNumbers('dudeD', { start: 0, end: 37}),
      frameRate: 10,
      repeat: -1,});
    // init scene juego
    this.scene.start("inicio");
  }
}
