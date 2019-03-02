
const PIXI = require('pixi.js');
const Mouse = require('pixi.js-mouse');
//misc
const keyboard = require('./misc/keyboard');
const calc = require('./misc/calculation');
// sprites
const Fire = require('./src/fire');
const Man = require('./src/man');

var app = new PIXI.Application(800, 600, { backgroundColor: 0x004400 });
document.body.appendChild(app.view);

PIXI.loader
    .add('assets/BlueMan/BlueMan.json')
    .load(onAssetsLoaded);

GS_LOAD = 0;
GS_ACTIVE = 1;


function onAssetsLoaded() {
    // Settings
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    // GLOBAL
    var GLOBAL_SPRITES = [];
    var GAME_STATE = GS_LOAD;

    // player Man
    var playerMan = Man(app.screen.width / 2, app.screen.height / 2, 0);
    app.stage.addChild(playerMan);
    GLOBAL_SPRITES.push(playerMan);

    var man1 = Man(200, 200, 0);
    app.stage.addChild(man1);
    GLOBAL_SPRITES.push(man1);

    GAME_STATE = GS_ACTIVE;
    // Animate the rotation
    app.ticker.add(function (delta) {
        if (GAME_STATE == GS_ACTIVE) {
            playerMan.rotation = calc.getAngleTo(Mouse.getPosX(), Mouse.getPosY(), playerMan.x, playerMan.y);

            GLOBAL_SPRITES.forEach(function (sprite) {
                sprite.objTick(delta);

            });
        }
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





