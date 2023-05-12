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
    
    // load graphics assets
    this.load.image('player', 'img/examplePlayer.png');
    this.load.image('tile', 'img/exampleTile.png');
    this.load.image('box', 'img/exampleBox.png');

    // load font
    this.load.bitmapFont('exampleFont', './font/gem.png', './font/gem.xml');
    }
    
    create(){
        // check for local storage browser support
        if(window.localStorage){
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title Scene
        this.scene.start('titleScene');
    }
}