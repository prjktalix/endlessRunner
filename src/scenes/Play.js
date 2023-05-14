class Play extends Phaser.Scene{
	constructor() {
		super('playScene');
	}

	create(){
		const {height, width} = this.game.config;
		// create tile ground
		this.ground = this.add.tileSprite(0, height, width, 26, 'tile').setOrigin(0, 1);
		this.player = this.physics.add.sprite(0, height, 'player') 
			.setCollideWorldBounds(true)
			.setGravityY(5000)
			.setOrigin(0, 1);  

		//this.handleInputs();
		cursors = this.input.keyboard.createCursorKeys();  
	}
	
	// player movement
	handleInputs(){
		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			if(!this.player.body.onFloor()){return;}
			this.player.setVelocityY(-1600);
		}
	}

	update(){
		this.ground.tilePositionX += 1;
		this.handleInputs();
		

	}
}
