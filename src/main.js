// Name: Brian Camilo
// Title: The Annoying Rabbit No Internet Connection Clone
// Time Approx: 24hrs
// -> My guess is that my game is super generic to be called as endless runner. My work is inspired from the no internet
// connection TREX endless runner, with added mechanics such as moving to dodge objects. The game intended to be a bit annoying
// as it has some junky mechanics like flappy bird that tends to annoy players.
// -> For the art design, I imitate the design of the TREX visual design especially with its color scheme and everything. 
// Especially with tiles and clouds. I used music from pixabay with all my musics are royalty-free SFX/music and I used
// a program called Slate for my visual art which is kind of similar to Asperite, but its free which I would prefer.
// I also have a 2 bugs in my game where there's a bug animation when pressing down arrow key which the collision works, but there's a
// flick going on with the ducking animation. I also get a bug where the score doesnt updated and ducking until the character die and been restarted
//

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
            //debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Title, Play]
}

//define game 
let game = new Phaser.Game(config);

// define global
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let cursors;