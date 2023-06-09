// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Escena1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("escena1");
  }

  init() {
  

    this.cantidadEstrellas = 0;
    console.log("Prueba !");
  }

  create() {
    // texto de puntaje
    const map = this.make.tilemap({ key: "map" });
    this.music = this.sound.add("music1");
    this.music.play({ loop: true, volume: 0.5 });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const capaFondo = map.addTilesetImage("sky", "tilesFondo");
    const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer(
      "plataformas",
      capaPlataformas,
      0,
      0
    );
    const objectosLayer = map.getObjectLayer("objetos");

    plataformaLayer.setCollisionByProperty({ colision: true });

    console.log("spawn point player", objectosLayer);

    // crear el jugador
    // Find in the Object Layer, the name "dude" and get position
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);

    // The player and its settings
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "salida")
      .setScale(0.2);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create empty group of starts
    this.estrellas = this.physics.add.group();
    

    // find object layer
    // if type is "stars", add to stars group
    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "estrella": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          const star = this.estrellas.create(x, y, "star");
          break;
        }
      }
    })

    this.enemy=this.physics.add.group();
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemigo": {
          const enemigo = this.enemy.create(x, y, "enemy");
          enemigo.anims.play('enemyanimation'); 
          enemigo.setVelocityX(30); 
          enemigo.setCollideWorldBounds(true);
  
          if(enemigo.setBounce > 0) {
            enemigo.setFlipX(false);
          } else if (enemigo.setBounce < 0) {
            enemigo.setFlipX(true); 
         
          
      
          break;
        }
      }
    }});
  
    this.enemy2=this.physics.add.group();
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemigo2": {
          const enemigo2 = this.enemy2.create(x, y, "enemy2");
          enemigo2.anims.play('enemy2animation'); 
          enemigo2.setVelocityY(30); 
          enemigo2.setCollideWorldBounds(true);
        
          break;
        }
      }
    });



    this.enemy2.getChildren().forEach((enemigo2) => {
      enemigo2.setVelocity(0, -150);
      enemigo2.setCollideWorldBounds(true);
    });

    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.enemy2,plataformaLayer);
    this.physics.add.collider(this.estrellas, plataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.estrellas,
      this.recolectarEstrella,
      null,
      this
    );
    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      this.salida,
      this.esVencedor,
      () => this.cantidadEstrellas >= 5, // condicion de ejecucion
      this
    );
    this.physics.add.collider(this.enemy, plataformaLayer);

    /// mostrar cantidadEstrella en pantalla
    this.cantidadEstrellasTexto = this.add.text(
      15,
      15,
      "Estrellas recolectadas: 0",
      { fontSize: "15px", fill: "#FFFFFF" }
    );
  }

  update() {
    // update game objects
    // check input
    //move left
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-160);
      this.jugador.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(160);
      this.jugador.anims.play("right", true);
    }
    //stop
    else {
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("turn");
    }

    //jump
    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-330);
    }
  }

  recolectarEstrella(jugador, estrella) {
    estrella.disableBody(true, true);

    // todo / para hacer: sumar puntaje
    //this.cantidadEstrellas = this.cantidadEstrellas + 1;
    this.cantidadEstrellas++;

    this.cantidadEstrellasTexto.setText(
      "Estrellas recolectadas: " + this.cantidadEstrellas
    );
  }
  

  esVencedor(jugador, salida) {
    // if (this.cantidadEstrellas >= 5)
    // sacamos la condicion porque esta puesta como 4to parametro en el overlap

    console.log("estrellas recolectadas", this.cantidadEstrellas);

    this.scene.start("escena2",{cantidadEstrellas: this.cantidadEstrellas});
    this.music.stop();
  }
}

