// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Inicio extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("inicio");
    }
  
    init() {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
    
    }
  
    create() {
      this.music = this.sound.add("victory");
      this.music.play({ loop: true, volume: 0.5 });
      var title=this.add.image(400,150,"titulo");
      var sprite = this.add.sprite(400, 300, 'dudeD');
      sprite.play('dudeDance')
      this.startButton=this.add.image(400,400,"inicioB");
      this.startButton.setScale(0.05)
                        .setInteractive()
                        .on('pointerdown', () => {
                          this.music.stop();
                          this.scene.start("escena1");
                        });
   
     }
    
   
    }
  
  