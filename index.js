
const PIXI = require('pixi.js');
const Mouse = require('pixi.js-mouse');
//misc
const keyboard = require('./misc/keyboard');
const calc = require('./misc/calculation');
// sprites
const Fire = require('./src/fire');

var app = new PIXI.Application(800, 600, { backgroundColor: 0x004400 });
document.body.appendChild(app.view);

PIXI.loader
    .add('assets/BlueMan/BlueMan.json')
    .load(onAssetsLoaded);


function onAssetsLoaded() {
    // Settings
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    // GLOBAL
    var GLOBAL_SPRITES = []

    // player Man
    var walkFrames = [];
    var stopFrame;
    for (var i = 1; i < 4; i++) {
        var val = i;

        // magically works since the spritesheet was loaded with the pixi loader
        walkFrames.push(PIXI.Texture.fromFrame('W' + val + '.png'));
    }
    idleFrame = PIXI.Texture.fromFrame('W2.png');
    let walk = walkFrames;
    let stop = [walkFrames[1]];
    //let mc = new AnimatedSprite(walk,stop);

    //playerMan = new PIXI.extras.AnimatedSprite(walkFrames);
    let playerMan = new PIXI.extras.AnimatedSprite(walk, stop);
    //playerMan = new AnimatedSprite(walk,stop);
    playerMan.play(0);
    playerMan.x = app.screen.width / 2;
    playerMan.y = app.screen.height / 2;
    playerMan.vx = 0;
    playerMan.vy = 0;
    playerMan.anchor.set(0.5);
    playerMan.animationSpeed = 0.15;
    playerMan.play("play");

    app.stage.addChild(playerMan);

    ;

    // Animate the rotation
    app.ticker.add(function (delta) {
        if (playerMan.vx == 0 && playerMan.vy == 0) {
            // playerMan.stop();
            playerMan.gotoAndStop(1);

        } else {
            // playerMan.play();
            playerMan.play();
            playerMan.go

        }
        playerMan.x += playerMan.vx * delta;
        playerMan.y += playerMan.vy * delta;

        playerMan.rotation = calc.getAngleTo(Mouse.getPosX(), Mouse.getPosY(), playerMan.x, playerMan.y);

        GLOBAL_SPRITES.forEach(function (sprite) {
            sprite.objTick(delta);
        });
    });

    Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
        console.log(buttonCode, mouseOriginX, mouseOriginY, mouseX, mouseY, mouseMoveX, mouseMoveY);
        var X = playerMan.x + calc.getAngleX(70, playerMan.rotation + calc.degree2Radian(40));
        var Y = playerMan.y + calc.getAngleY(70, playerMan.rotation + calc.degree2Radian(40));
        fire = Fire(X, Y, playerMan.rotation);
        app.stage.addChild(fire);
        GLOBAL_SPRITES.push(fire);

    });

    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    let keyObjectUp = keyboard("ArrowUp");
    let keyObjectDown = keyboard("ArrowDown");
    let keyObjectLeft = keyboard("ArrowLeft");
    let keyObjectRight = keyboard("ArrowRight");
    var MOVEMENT_VEL = 4;


    keyObjectUp.press = () => {
        playerMan.vy = -MOVEMENT_VEL;
    };
    keyObjectDown.press = () => {
        playerMan.vy = MOVEMENT_VEL;
    };
    keyObjectRight.press = () => {
        playerMan.vx = +MOVEMENT_VEL;
    };
    keyObjectLeft.press = () => {
        playerMan.vx = -MOVEMENT_VEL;
    };

    keyObjectUp.release = () => {
        playerMan.vy = 0;
    };
    keyObjectDown.release = () => {
        playerMan.vy = 0;
    };
    keyObjectRight.release = () => {
        playerMan.vx = 0;
    };
    keyObjectLeft.release = () => {
        playerMan.vx = 0;
    };
}





