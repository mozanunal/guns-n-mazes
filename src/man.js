
'use strict';

const Fire = require('./fire');
const calc = require('../misc/calculation');
const HealthBar = require('./healthBar');

const SPEED = 10;

function Man(app, x, y, rotation) {
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

    man.tag = "man";

    man.health = 100;
    var healthBar = HealthBar();
    man.healthBar = healthBar;
    man.addChild(man.healthBar);
    // const HB_LEN = 128;
    // const HB_THICKNESS = 12;
    // //Create the health bar
    // healthBar = new PIXI.Container();
    // healthBar.position.set(-HB_LEN/2, 60);
    // man.addChild(healthBar);
    man.takeDamage = (amount) => {
        man.health -= amount;
        man.healthBar.setHealth(man.health);
        if(man.health<=0) {
            man.health=0;
            console.log("dead");
            man.destroy();
        }
        console.log(man.health);
    } 

    man.fire = function ( ) {
        var X = man.x + calc.getAngleX(70, man.rotation + calc.degree2Radian(40));
        var Y = man.y + calc.getAngleY(70, man.rotation + calc.degree2Radian(40));
        return Fire(app, X, Y, man.rotation);
    }

    man.r = 50; //Circular Collider Radius 
    man.isCircular = true; //Is Collider circular

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

    man.objTick = function (delta) {
        man.ammoFiller(delta);
        if (man.vx == 0 && man.vy == 0) {
            man.gotoAndStop(1);
        } else {
            man.play();
        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;
    }
    app.stage.addChild(man);
    return man;

}

module.exports = Man;
