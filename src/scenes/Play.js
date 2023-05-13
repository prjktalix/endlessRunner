class Play extends Phaser.Scene{
	constructor() {
		super('playScene');
	}

	create(){
		const {height, width} = this.game.config;
		// create tile ground
		this.ground = this.add.tileSprite(0, height, width, 26, 'tile').setOrigin(0, 1)
		this.player = this.physics.add.sprite(0, height, 'examplePlayer').setOrigin(0,1);
	}

	update(){
		this.ground.tilePositionX += 10;
	}
}
