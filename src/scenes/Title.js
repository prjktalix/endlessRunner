class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY, 'gem', 'PADDLE PARKOUR P360', 64).setOrigin(0.5).setTint(0xff0000);
        let title02 = this.add.bitmapText(centerX, centerY, 'gem', 'PADDLE PARKOUR P360', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        let title03 = this.add.bitmapText(centerX, centerY, 'gem', 'PADDLE PARKOUR P360', 64).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
       
        this.add.bitmapText(centerX, centerY + textSpacer, 'gem', 'Use the UP & DOWN ARROWS to dodge color paddles', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*3, 'gem', 'Press UP ARROW to Start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, 'gem', 'Nathan Altice 2017-23', 16).setOrigin(0.5);


        // title text tweens
        let yoyoTweenA = this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1
        });
        yoyoTweenA.on('yoyo', () => { this.cameras.main.shake(100, 0.0025); });
        let yoyoTweenB = this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1
        });
        yoyoTweenB.on('yoyo', () => { this.cameras.main.shake(100, 0.0025); });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
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