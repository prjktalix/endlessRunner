class Play extends Phaser.Scene{
	constructor() {
		super('playScene');
	}

	create(){
		const {height, width} = this.game.config;
		this.gameSpeed = 5;
		this.respawnTime = 0;
		this.isRunning = false;
		this.score = 0;

		// create tile ground
		this.ground = this.add.tileSprite(0, height, width, 26, 'tile').setOrigin(0, 1);
		this.player = this.physics.add.sprite(0, height, 'player') 
			.setCollideWorldBounds(true)
			.setGravityY(5000)
			.setOrigin(0, 1);  

		this.gameOverText = this.add.bitmapText(centerX, centerY, 'exampleFont', 'GAMEOVER', 24).setOrigin(0.5);
		this.gameOverText.setAlpha(0);
		
		this.restart = this.add.bitmapText(centerX, centerY + textSpacer * .4, 'exampleFont', 'press here to restart', 24).setOrigin(0.5);
		this.restart.setInteractive();
		this.restart.setAlpha(0);

		this.scoreText = this.add.bitmapText(w - textSpacer + 30,  h - 325, 'exampleFont', '00000', 24).setOrigin(0.5);	
		this.highScoreText = this.add.bitmapText(w - textSpacer + 30,  h - 325, 'exampleFont', '00000', 24).setOrigin(0.5);	

		this.obstacles = this.physics.add.group();
		this.initAnims(); 
		this.initCollider();
		this.isScore();

		cursors = this.input.keyboard.createCursorKeys();  
	}

	isScore(){
		this.time.addEvent({
			delay: 1000 / 10,
			loop: true,
			callbackScope: this,
			callback: () => {
				if(!this.isRunning) {return;}
				this.score++;
				this.gameSpeed += 0.01;

				const score = Array.from(String(this.score), Number);
				for(let i = 0; i < 5 - String(this.score).length; i++){
					score.unshift(0);
				}

				this.scoreText.setText(score.join(''));
			}
		})
	}
	
	// player movement
	isInput(){

		this.restart.on('pointerdown', () => {
			this.player.setVelocityY(0);
			this.player.body.height = 92;
			this.player.body.offset.y = 0;
			this.physics.resume();
			this.obstacles.clear(true, true);
			this.isRunning = true;
			this.gameOverText.setAlpha(0);
			this.restart.setAlpha(0);

			this.gameSpeed = 5;
			
			this.anims.resumeAll();
		  });

		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			if(!this.player.body.onFloor()){return;}

			this.player.body.height = 94;
			this.player.body.offset.y = 0;
			this.player.setVelocityY(-1600);
		}
		if(Phaser.Input.Keyboard.JustDown(cursors.down)){
			if(!this.player.body.onFloor() || !this.isRunning){return;}

			this.player.body.height = 58;
			this.player.body.offset.y = 34;
		}

		if(Phaser.Input.Keyboard.JustUp(cursors.down)){
			this.player.body.height = 94;
			this.player.body.offset.y = 0;
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
		this.physics.add.collider(this.player, this.obstacles, () =>{
			
			// show high score
			this.highScoreText.x = this.scoreText.x - this.scoreText.width - 30;
			const highScore = this.highScoreText.text.substring(this.highScoreText.text.length - 5);
			const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;
			this.highScoreText.setText('HI ' + newScore);

			this.physics.pause();
			this.isRunning = false;
			this.anims.pauseAll();
			this.player.setTexture('playerDead');
			this.respawnTime = 0;
			this.gameSpeed = 0;
			this.score = 0;
			this.gameOverText.setAlpha(1);
			this.restart.setAlpha(1);
		},null, this);
		
	}

	update(){
		this.ground.tilePositionX += this.gameSpeed;
		this.isInput();
		Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);

		this.respawnTime += 50 * this.gameSpeed * 0.08;
		if(this.respawnTime >= 1500) {
			this.placeObstacle();
			this.respawnTime = 0;
		}
		
		// destroy obstacles if out of bounce
		this.obstacles.getChildren().forEach(obstacle => {
			if (obstacle.getBounds().right < 0) {
			  this.obstacles.killAndHide(obstacle);
			}
		})

		//running animation
		if (this.player.body.deltaAbsY() > 0) {		// if jump
			this.player.anims.stop();				// stop running animation
			this.player.setTexture('playerRun', 0);	
		  } else {
			this.player.body.height <= 58 ? this.player.play('player-kneel', true) : this.player.play('player-run', true); // continue running animation
		}

	}
}
