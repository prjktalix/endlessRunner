class Title extends Phaser.Scene {
	constructor() {
		super('titleScene');
	}
	
	create(){
		this.add.bitmapText(centerX, centerY, 'exampleFont', 'Title LMFAOOO', 64).setOrigin(0.5);

		this.add.bitmapText(centerX, centerY + textSpacer, 'exampleFont', 'Press SPACE button to dodge <I DUNNO>', 24).setOrigin(0.5);
		this.add.bitmapText(centerX, centerY + textSpacer * 1.5, 'exampleFont', 'Press SPACE to start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer * 2, 'exampleFont', 'Brian Camilo 2023', 16).setOrigin(0.5);

		// set up cursor keys
		cursors = this.input.keyboard.createCursorKeys();  
	}

	update(){
		// check for space input
		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			let textureManager = this.textures;
            // take snapshot of the entire game viewport
            // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
            // .snapshot(callback, type, encoderOptions)
            // the image is automatically passed to the callback
            this.game.renderer.snapshot((snapshotImage) => {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', snapshotImage);
            });
			
			// start next scene
			this.scene.start('playScene');
		}
	}


}