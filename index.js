
const PIXI = require('pixi.js');
const keyboard = require('./misc/keyboard');

var app = new PIXI.Application();
document.body.appendChild(app.view);

let playerMan;

PIXI.loader
    .add('assets/BlueMan/BlueMan.json')
    .load(onAssetsLoaded);


 function onAssetsLoaded()
 {
     // create an array of textures from an image path
     var walkFrames = [];
     var stopFrame;
     for (var i = 1; i < 4; i++) {
         var val = i;

         // magically works since the spritesheet was loaded with the pixi loader
         walkFrames.push(PIXI.Texture.fromFrame('W' + val + '.png'));
     }
     idleFrame = PIXI.Texture.fromFrame('W2.png');
     // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
     let walk = walkFrames;
     let stop = [walkFrames[1]];
     //let mc = new AnimatedSprite(walk,stop);
     
     
     //playerMan = new PIXI.extras.AnimatedSprite(walkFrames);
     playerMan = new PIXI.extras.AnimatedSprite(walk,stop);

     //playerMan = new AnimatedSprite(walk,stop);
     playerMan.play(0);
   
     
     /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
     playerMan.x = app.screen.width / 2;
     playerMan.y = app.screen.height / 2;
     playerMan.anchor.set(0.5);
     playerMan.animationSpeed = 0.1;
     playerMan.play("play");

    app.stage.addChild(playerMan);

    playerMan.vx = 0;
    playerMan.vy = 0;

     // Animate the rotation
     app.ticker.add(function(delta) {
        if(playerMan.vx==0&&playerMan.vy==0){
           // playerMan.stop();
           playerMan.gotoAndStop(1);
           
        } else {
           // playerMan.play();
           playerMan.play();
           playerMan.go
           
        }
         playerMan.x += playerMan.vx*10*delta;
         playerMan.y += playerMan.vy*10*delta;
     });
 }



// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
let keyObjectUp = keyboard("ArrowUp");
let keyObjectDown = keyboard("ArrowDown");
let keyObjectLeft = keyboard("ArrowLeft");
let keyObjectRight = keyboard("ArrowRight");
var MOVEMENT_VEL = 10;


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
