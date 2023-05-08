'use strict'

let config = {
    parent: "myGame",
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scale:{
        autoCenter: Phaser.scale.CENTER_BOTH
    },
    physics:{
        default: 'arcade',
        arcade:{
            //debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    }
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