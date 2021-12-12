class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){

    if('geolocation' in navigator){
      console.log("Geolocation avaliable");
      navigator.geolocation.getCurrentPosition(position =>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        if(lat > 40){
          this.load.image("background1", "assets/images/background1.png");

        }else{
          this.load.image("background2", "assets/images/background2.png");
        }
    
        console.log(position);
      });
    }else{
      console.log("cannot locate user");
    }

    this.load.image("goku", "assets/images/goku.png");

    this.load.image("cell", "assets/images/cell.png");
    this.load.image("frieza", "assets/images/frieza.png");

    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

  
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    const ctx = new AudioContext();
    let audio;

    fetch("assets/audio/dragonball_awake.mp3")
    .then(data => data.arrayBuffer())
    .then (arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio = decodedAudio;
    });

    function playblack(){

      const playSound = ctx.createBufferSource();
      playSound.buffer = audio;
      playSound.connect(ctx.destination);
      playSound.start(ctx.currentTime);
      
    }


    window.addEventListener("click", playblack);
    

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }
}
