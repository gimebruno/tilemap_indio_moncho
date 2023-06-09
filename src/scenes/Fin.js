// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Fin extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("fin");
  }

  init(data) {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
    console.log(data);
    this.cantidadEstrellas = data.cantidadEstrellas;
  }

  create() {
    this.music = this.sound.add("victory");
    this.music.play({ loop: true, volume: 0.5 });
    this.cantidadEstrellasTexto = this.add.text(
      240,
      300,
        "FIN! Estrellas recolectadas: " + this.cantidadEstrellas,
      { fontSize: "20px", fill: "#FFFFFF" }
    );
    
    this.restartButton=this.add.image(400,400,"restartB");
    this.restartButton.setScale(0.05)
                      .setInteractive()
                      .on('pointerdown', () => {
                        this.music.stop();
                        this.scene.start("escena1");
                      });
 
   }
 
  }

