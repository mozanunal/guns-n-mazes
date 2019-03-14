'use strict';

const Fire = require('./fire');
const calc = require('../misc/calculation');
const keyboard = require('../misc/keyboard');
const Mouse = require('pixi.js-mouse');
const collision = require('./collision');
const ManBase = require('./skinnedMan');
const connection = require('./connection');
const MOVEMENT_VEL = 4;

function man(app, x, y, rotation) {
    
    //let man = new PIXI.extras.AnimatedSprite(walk, stop);
    let man = ManBase(app, x,y, rotation);

    man.ammo = 6;
    man.fire = function () {
        if(man.ammo>0) {
            man.ammo--;
            var X = man.x + calc.getAngleX(70, man.rotation + calc.degree2Radian(40));
            var Y = man.y + calc.getAngleY(70, man.rotation + calc.degree2Radian(40));
            return Fire(app, X, Y, man.rotation);
        }
    }
    man.timeCounter2 = 0;
    man.ammoFiller = (delta) => {
        man.timeCounter2 += delta;
        if(man.timeCounter2>30) {
            if(man.ammo<6) {
                man.timeCounter2 = 0;
                man.ammo++;
            }
        }
    }

    let manPacker = (ma)=> {
        return{"id":ma.id,"posX":ma.x,"posY":ma.y,"vx":ma.vx,"vy":ma.vy}
    }

    let conn = connection();


    man.objTick = function (delta) {
        man.rotation = calc.getAngleTo(app.screen.width / 2, app.screen.height / 2, Mouse.getPosX(), Mouse.getPosY() );
        man.ammoFiller(delta);
        man.objCollider();
        if (man.vx == 0 && man.vy == 0) {
            man.feet.gotoAndStop(1);
        } else {
            man.feet.play();
        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;

        try{
        //conn.send(man.vx);
        conn.sendObject(manPacker(man));
        }
        catch(err) {

        }
    }
    man.colCounter = 0;

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
            //console.log("Past time",(t2-t1));
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
        //console.log(app.stage.children);
        //app.stage.isShaking = true;

    });

    app.stage.addChild(man);
    return man;

}

module.exports = man;