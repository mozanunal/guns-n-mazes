'use strict';

const Fire = require('./fire');
const calc = require('../misc/calculation');
const keyboard = require('../misc/keyboard');
const Mouse = require('pixi.js-mouse');
const collision = require('./collision');
const MOVEMENT_VEL = 4;

function man(app, x, y, rotation) {
    var walkFrames = [];
    var stopFrame;
    for (var i = 1; i < 4; i++) {
        walkFrames.push(PIXI.Texture.fromFrame('W' + i + '.png'));
    }
    let walk = walkFrames;
    let stop = [walkFrames[1]];
    let man = new PIXI.extras.AnimatedSprite(walk, stop);

    man.play();
    man.x = x;
    man.y = y;
    man.vx = 0;
    man.vy = 0;
    man.anchor.set(0.5);
    man.animationSpeed = 0.15;
    man.play("play");


    man.fire = function () {
        var X = man.x + calc.getAngleX(70, man.rotation + calc.degree2Radian(40));
        var Y = man.y + calc.getAngleY(70, man.rotation + calc.degree2Radian(40));
        return Fire(app, X, Y, man.rotation);
    }

    man.objTick = function (delta) {
        man.rotation = calc.getAngleTo(app.screen.width / 2, app.screen.height / 2, Mouse.getPosX(), Mouse.getPosY() );
        man.objCollider();
        if (man.vx == 0 && man.vy == 0) {
            man.gotoAndStop(1);
        } else {
            man.play();
        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;
    }
    man.colCounter = 0;

    man.r = 50; //Circular Collider Radius 
    man.isCircular = true; //Is Collider circular
    man.objCollider = function() {
        //console.log(app.stage);
        man.colCounter++;
        if(man.colCounter>0) {
            var t1 = performance.now; 
            app.stage.children.forEach(element => {
                if(element!=man) {

                    var colliding = collision.CalculateCollision(man,element);
                    if(colliding[0]==true) {
                        collision.PlayerCollisionEffect(man,colliding[1]);
                    }
                    
                }
            });
            var t2 = performance.now; 
            console.log("Past time",(t2-t1));
            man.colCounter=0;
        }   
        
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    let keyObjectUp = keyboard("w");
    let keyObjectDown = keyboard("s");
    let keyObjectLeft = keyboard("a");
    let keyObjectRight = keyboard("d");

    keyObjectUp.press = () => {
        man.vy = -MOVEMENT_VEL;
    };
    keyObjectDown.press = () => {
        man.vy = MOVEMENT_VEL;
    };
    keyObjectRight.press = () => {
        man.vx = +MOVEMENT_VEL;
    };
    keyObjectLeft.press = () => {
        man.vx = -MOVEMENT_VEL;
    };

    keyObjectUp.release = () => {
        man.vy = 0;
    };
    keyObjectDown.release = () => {
        man.vy = 0;
    };
    keyObjectRight.release = () => {
        man.vx = 0;
    };
    keyObjectLeft.release = () => {
        man.vx = 0;
    };

    Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
        //console.log(buttonCode, mouseOriginX, mouseOriginY, mouseX, mouseY, mouseMoveX, mouseMoveY);
       // console.log( playerMan.position.x, playerMan.position.y );
        man.fire();
        //console.log(man.width,man.height);
       // console.log(app.stage.children);

    });

    app.stage.addChild(man);
    return man;

}

module.exports = man;