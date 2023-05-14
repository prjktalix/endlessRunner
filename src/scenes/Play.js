class Play extends Phaser.Scene{
	constructor() {
		super('playScene');
	}

	create(){
		const {height, width} = this.game.config;
		this.gameSpeed = 1;
		this.respawnTime = 0;
		this.isRunning = false;

		// create tile ground
		this.ground = this.add.tileSprite(0, height, width, 26, 'tile').setOrigin(0, 1);
		this.player = this.physics.add.sprite(0, height, 'player') 
			.setCollideWorldBounds(true)
			.setGravityY(5000)
			.setOrigin(0, 1);  

		this.obstacles = this.physics.add.group();
		this.initAnims(); 
		this.initCollider();

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

	placeObstacle(){
		const {height, width} = this.game.config;

		const obstacleObj = Math.floor(Math.random() * 7) + 1;
		const distance = Phaser.Math.Between(600, 900);
		let obstacle;

		if(obstacleObj > 6){
			const enemyHeight = [22, 50]
			obstacle = this.obstacles.create(width + distance, height - enemyHeight[Math.floor(Math.random() * 2)], 'enemybird');
			obstacle.play('enemy-bird', 1);
			obstacle.body.height = obstacle.body.height / 1.5;
		} else {
			obstacle = this.obstacles.create(width + distance, height, `obstacle-${obstacleObj}`);
			obstacle.body.offset.y = +10;
		}
		obstacle.setOrigin(0, 1);
		obstacle.setImmovable();
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

		this.anims.create({
			key: 'enemy-bird',
			frames: this.anims.generateFrameNumbers('enemyBird', {start: 0, end: 1}),
			frameRate: 6,
			repeat: -1
		})
	  
	}

	initCollider(){
		this.physics.add.collider(this.dino, this.obstacles, () =>{
			this.physics.pause();
			this.game
		});
	}

	update(){
		this.ground.tilePositionX += this.gameSpeed;
		this.handleInputs();
		Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);

		this.respawnTime += 50 * this.gameSpeed * 0.08;
		if(this.respawnTime >= 1500) {
			this.placeObstacle();
			this.respawnTime = 0;
		}
	

		//running animation
		if (this.player.body.deltaAbsY() > 0) {		// if jump
			this.player.anims.stop();				// stop running animation
			this.player.setTexture('playerRun', 0);	
		  } else {
			this.player.body.height <= 58 ? this.player.play('player-kneel', true) : this.player.play('player-run', true); // continue running animation
		}

	}
}
