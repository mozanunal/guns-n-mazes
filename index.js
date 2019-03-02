
const PIXI = require('pixi.js');
const keyboard = require('./misc/keyboard');
const drawMap = require('./src/map0');

var app = new PIXI.Application({backgroundColor : 0x444444});
document.body.appendChild(app.view);

let playerMan;
const blocks = ['assets/BlueMan/Dg1.png','assets/BlueMan/Dg2.png','assets/BlueMan/Dg3.png','assets/BlueMan/Dg4.png','assets/BlueMan/Dg5.png'];
PIXI.loader
    .add('assets/BlueMan/BlueMan.json')
    .add(blocks)
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
     var blockTexts = [];

     for (var i=0;i<5;i++) {
         blockTexts[i]= new PIXI.Texture.fromImage(blocks[i]);
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
     playerMan.animationSpeed = 0.15;
     playerMan.play("play");

    app.stage.addChild(playerMan);
    console.log(blocks[0]);

    drawMap(blockTexts,app);
    
   
    playerMan.vx = 0;
    playerMan.vy = 0;

    app.stage.position.set(app.screen.width / 2,app.screen.height / 2);
    app.stage.pivot.copy(playerMan.position);

    
     
     // Animate the rotation
     app.ticker.add(function(delta) {
        if(playerMan.vx==0&&playerMan.vy==0){
           // playerMan.stop();
           playerMan.gotoAndStop(1);
           
        } else {
           // playerMan.play();
           playerMan.play();
           //playerMan.go
           
        }
         playerMan.x += playerMan.vx*delta;
         playerMan.y += playerMan.vy*delta;
         //console.log(playerMan.position);
         app.stage.pivot.copy(playerMan.position);

     });
 }



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
