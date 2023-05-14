class Title extends Phaser.Scene {
	constructor() {
		super('titleScene');
	}
	
	create(){
		this.add.bitmapText(centerX, centerY - 65, 'exampleFont', 'The Annoying Rabbit ', 64).setOrigin(0.5);
		this.add.bitmapText(centerX, centerY, 'exampleFont', 'No Internet Connection Clone', 64).setOrigin(0.5);

		this.add.bitmapText(centerX, centerY + textSpacer, 'exampleFont', 'Press SPACE to jump, and LEFT/DOWN/RIGHT arrow buttons to dodge obstacles', 24).setOrigin(0.5);
		this.add.bitmapText(centerX, centerY + textSpacer * 1.5, 'exampleFont', 'Press SPACE to start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer * 2, 'exampleFont', 'Brian Camilo 2023', 16).setOrigin(0.5);

		// set up cursor keys
		cursors = this.input.keyboard.createCursorKeys();  
	}

	update(){
		// check for space input
		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			// start next scene
			this.scene.start('playScene');
		}
	}


}