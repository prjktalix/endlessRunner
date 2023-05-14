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
		
		
		
		this.initAnims(); 
		cursors = this.input.keyboard.createCursorKeys();  
	}
	
	// player movement
	handleInputs(){
		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			if(!this.player.body.onFloor()){return;}

			this.player.body.height = 94;
			this.player.body.offset.y = 0;
			this.player.setVelocityY(-1600);
		}
		if(Phaser.Input.Keyboard.JustDown(cursors.down)){
			
				this.player.body.height = 58;
				this.player.body.offset.y = 34;
		}
		
	}

	initAnims(){
		this.anims.create({
			key: 'player-run',
			frames: this.anims.generateFrameNumbers('playerRun', {start: 2, end: 3}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'player-kneel',
			frames: this.anims.generateFrameNumbers('playerKneel', {start: 0, end: 1}),
			frameRate: 10,
			repeat: -1
		  })
	  
	}

	update(){
		this.ground.tilePositionX += 1;
		this.handleInputs();
		
		//running animation
		if (this.player.body.deltaAbsY() > 0) {		// if jump
			this.player.anims.stop();				// stop running animation
			this.player.setTexture('playerRun', 0);	
		  } else {
			this.player.body.height <= 58 ? this.player.play('player-kneel', true) : this.player.play('player-run', true);
			// continue running animation
		}
	}
}
