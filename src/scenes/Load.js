class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        // loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                             // reset
            loadingBar.fillStyle(0xFFFFFF, 1);              // color, alpha
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () =>{
            loadingBar.destroy();
        });

        this.load.path = "./assets/";
        
        // load sprites objects and player anims
        this.load.atlas('mySprite', 'img/spritesheet.png', 'img/sprites.json');
        this.load.image('playerDead', 'img/playerDead.png');

        this.load.spritesheet('playerRun', 'img/PlayerRun.png', {
            frameWidth: 81,
            frameHeight: 65
        });

        this.load.spritesheet('playerKneel', 'img/PlayerKneel.png', {
            frameWidth: 50,
            frameHeight: 67
        });

        this.load.spritesheet('enemyBird', 'img/enemyBird.png', {
            frameWidth: 74,
            frameHeight: 52
        });

        this.load.image('obstacle-1', 'img/flower_small_1.png');
        this.load.image('obstacle-2', 'img/flower_small_2.png');
        this.load.image('obstacle-3', 'img/flower_small_3.png');
        this.load.image('obstacle-4', 'img/tree_big_1.png');
        this.load.image('obstacle-5', 'img/tree_big_2.png');
        this.load.image('obstacle-6', 'img/tree_big_3.png');

        // load audio assets
        this.load.audio('hit', 'audio/hit.mp3');
        this.load.audio('coin', 'audio/coin.mp3');
        this.load.audio('jump', 'audio/jump.mp3');
        this.load.audio('background', 'audio/background.mp3');


        // load font
        this.load.bitmapFont('exampleFont', './font/gem.png', './font/gem.xml');
    }
    
    create(){
        // go to Title Scene
        this.scene.start('titleScene');
    }
} 