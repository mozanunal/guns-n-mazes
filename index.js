
const PIXI = require('pixi.js');

var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// create a new Sprite from an image path

var deneme = PIXI.Sprite.fromImage('assets/cat/cat.png');


function Bunny() {
    var bunny = PIXI.Sprite.fromImage('assets/cat/cat.png');
    // center the sprite's anchor point
    bunny.anchor.set(0.5);
    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.vx = 0;
    bunny.vy = 0;
    return bunny;
}

bun1 = Bunny();



app.stage.addChild(bun1);

// Listen for animate update
app.ticker.add(function (delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bun1.rotation += 0.1 * delta;
    bun1.x += bun1.vx;
    bun1.y += bun1.vy;

});


// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
let keyObjectUp = keyboard("ArrowUp");
let keyObjectDown = keyboard("ArrowDown");
let keyObjectLeft = keyboard("ArrowLeft");
let keyObjectRight = keyboard("ArrowRight");
var MOVEMENT_VEL = 1;


keyObjectUp.press = () => {
    bun1.vy = -MOVEMENT_VEL;
};
keyObjectDown.press = () => {
    bun1.vy = MOVEMENT_VEL;
};
keyObjectRight.press = () => {
    bun1.vx = +MOVEMENT_VEL;
};
keyObjectLeft.press = () => {
    bun1.vx = -MOVEMENT_VEL;
};

keyObjectUp.release = () => {
    bun1.vy = 0;
};
keyObjectDown.release = () => {
    bun1.vy = 0;
};
keyObjectRight.release = () => {
    bun1.vx = 0;
};
keyObjectLeft.release = () => {
    bun1.vx = 0;
};

