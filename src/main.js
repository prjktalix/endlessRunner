'use strict'

let config = {
    parent: "myGame",
    type: Phaser.AUTO,
    height: 340,
    width: 1000,
    scale:{
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    transparent: true,
    physics:{
        default: 'arcade',
        arcade:{
            debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Title, Play, GameOver]
}

//define game 
let game = new Phaser.Game(config);

// define global
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
let level;
let highScore;
let newHighScore = false;
let cursors;