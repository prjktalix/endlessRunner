class Play extends Phaser.Scene{
	constructor() {
		super('playScene');
	}

	create(){
		this.gameSpeed = 2;
		this.respawnTime = 0;
		this.isRunning = false;
		this.score = 0;

		// added sfx
		this.jumpSound = this.sound.add('jump', {volume: 0.3});
		this.coinSound = this.sound.add('coin', {volume: 0.3});
		this.hitSound = this.sound.add('hit', {volume: 0.3});

		// set up audio, play bgm
		this.bgm = this.sound.add('background', { 
			mute: false,
			volume: 0.3,
			rate: 1,
			loop: true 
		});
		this.bgm.play();
	

		// create tile ground
		this.ground = this.add.tileSprite(0, game.config.height, game.config.width, 26, 'mySprite', 'tile').setOrigin(0, 1);		

		this.player = this.physics.add.sprite(0, 0, 'mySprite', 'playerIdle');
		this.player.setCollideWorldBounds(true);
		this.player.setGravityY(5000);
		this.player.setOrigin(0, 1);  

		this.gameOverText = this.add.bitmapText(centerX, centerY, 'exampleFont', 'GAMEOVER', 24).setOrigin(0.5);
		this.gameOverText.setInteractive();
		this.gameOverText.setAlpha(0);
		
		this.restart = this.add.bitmapText(centerX, centerY + textSpacer * .4, 'exampleFont', 'press here to restart', 24).setOrigin(0.5);
		this.restart.setInteractive();
		this.restart.setAlpha(0); 

		this.scoreText = this.add.bitmapText(w - 965,  h - 325, 'exampleFont', '0000', 24).setOrigin(0.5);	
		this.highScoreText = this.add.bitmapText(w - textSpacer + 10,  h - 325, 'exampleFont', 'HI 0000', 24).setOrigin(0.5);	

		// added clouds
		this.addCloud = this.add.group();
		this.addCloud.addMultiple([
			this.add.image(game.config.width / 2, 170, 'mySprite', 'cloud'),
			this.add.image(game.config.width - 80, 80, 'mySprite', 'cloud'),
			this.add.image((game.config.width / 1.3), 100, 'mySprite', 'cloud')
		]);

		this.obstacles = this.physics.add.group();
		this.isAnimated(); 
		this.isCollide();
		this.isScore();
		this.isOutOfBounce();
		this.isRunningAnim();
		this.isObstacleRespawn();

		cursors = this.input.keyboard.createCursorKeys();  
	}
	isCollide(){
		this.physics.add.collider(this.player, this.obstacles, () =>{
			
			// show high score
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
			this.player.setAccelerationX(0);
			this.gameOverText.setAlpha(1);
			this.restart.setAlpha(1);
			this.hitSound.play();
		},null, this);
		
	}
	isScore(){
		this.time.addEvent({
			delay: 150,
			loop: true,
			callback: () => {
				if(!this.isRunning) {
					return;}
				this.score++;				// increment the score
				this.gameSpeed += 0.001;	// slwoly increase the gamespeed

				// make sound if reach to 50
				if (this.score % 50 == 0){
					this.coinSound.play();
				}

				// shift the 0s
				const score = Array.from(String(this.score), Number);
				for(let i = 0; i < 4 - String(this.score).length; i++){
					score.unshift(0);
				}

				this.scoreText.setText(score.join(''));
			}
		})
	}
	
	// user input
	isInput(){
		// restart button
		this.restart.on('pointerdown', () => {
			this.player.setVelocityY(0);
			this.player.body.height = 65;
			this.player.body.offset.y = 0;
			this.player.setX(0);
			this.physics.resume();
			this.obstacles.clear(true, true);
			this.isRunning = true;
			this.gameOverText.setAlpha(0);
			this.restart.setAlpha(0);
			this.gameSpeed = 2;
			
			this.anims.resumeAll();
		  });

		// player jump
		if(Phaser.Input.Keyboard.JustDown(cursors.space)){
			if(!this.player.body.onFloor()){return;}
			this.player.body.height = 65;
			this.jumpSound.play();
			this.player.setVelocityY(-1600);
		}
		
		// player move right
		if(Phaser.Input.Keyboard.JustDown(cursors.right)){
			this.player.setFlipX(0);
			this.player.setAccelerationX(500);
		}

		if(Phaser.Input.Keyboard.JustUp(cursors.right)){
			this.player.setAccelerationX(0);
		}

		// player move left
		if(Phaser.Input.Keyboard.JustDown(cursors.left)){
			this.player.setFlipX(1);
			this.player.setAccelerationX(-500);
		}

		if(Phaser.Input.Keyboard.JustUp(cursors.left)){
			this.player.setAccelerationX(0);
		}
		// player ducked
		if(Phaser.Input.Keyboard.JustDown(cursors.down)){
			if(!this.player.body.onFloor() || !this.isRunning){return;}

			this.player.body.height = 29;
			this.player.body.offset.y = 34;
		}

		if(Phaser.Input.Keyboard.JustUp(cursors.down)){
			this.player.body.height = 65;
			this.player.body.offset.y = 0;
		}
		
	}


	// produce enemy obstacles
	objects(){
		// random object flower/trees
		const obstacleObj = Math.floor(Math.random() * 7) + 1;
		const distance = Phaser.Math.Between(600, 900);
		let obstacle;

		if(obstacleObj > 6){
			const enemyHeight = [22, 50]
			obstacle = this.obstacles.create(game.config.width + distance, game.config.height - enemyHeight[Math.floor(Math.random() * 2)], 'enemybird');
			obstacle.play('enemy-bird', 1);
			obstacle.body.height = obstacle.body.height / 1.5;
		} else {
			obstacle = this.obstacles.create(game.config.width + distance, game.config.height, `obstacle-${obstacleObj}`);
			obstacle.body.offset.y = +10;
		}
		obstacle.setOrigin(0, 1);
		obstacle.setImmovable();

		
	}

	isAnimated(){
		this.anims.create({
			key: 'player-run',
			frames: this.anims.generateFrameNumbers('playerRun', {
				start: 0, end: 1
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'player-kneel',
			frames: this.anims.generateFrameNumbers('playerKneel', {
				start: 0, end: 1}),
			frameRate: 2,
			repeat: -1
		});
		

		this.anims.create({
			key: 'enemy-bird',
			frames: this.anims.generateFrameNumbers('enemyBird', {
				start: 0, end: 1
			}),
			frameRate: 6,
			repeat: -1
		});
	  
	}



	isOutOfBounce(){
		// destroy obstacles if out of bounce
		this.obstacles.getChildren().forEach(obstacle => {
			if (obstacle.getBounds().right < 0) {
			this.obstacles.killAndHide(obstacle);
			}
		});

		// loop clouds
		this.addCloud.getChildren().forEach(clouds => {
			if (clouds.getBounds().right > 1000) {
				clouds.x = 0;
			}
		});
	}

	isRunningAnim(){
		//running animation
		if (this.player.body.deltaAbsY() > 0) {		// if jump
			this.player.anims.stop();				// stop running animation
			this.player.setTexture('playerRun');	
		  } else {
			this.player.body.height <= 29 ? this.player.play('player-kneel', true) : this.player.play('player-run', true); // continue running animation
		}
	}

	// respawn obstacle objects
	isObstacleRespawn(){
		this.respawnTime += 25 * this.gameSpeed * 0.08;
		if(this.respawnTime >= 1500) {
			this.objects();
			this.respawnTime = 0;
		}
	}

	update(){
		this.ground.tilePositionX += this.gameSpeed;
		this.isInput();
		
		Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed);
		Phaser.Actions.IncX(this.addCloud.getChildren(), 0.8);

		this.isObstacleRespawn();
		this.isOutOfBounce();
		this.isRunningAnim();

	}
}
