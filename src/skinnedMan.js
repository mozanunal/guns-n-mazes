
'use strict';

const Fire = require('./fire');
const calc = require('../misc/calculation');


const SPEED = 10;

function Man(app, x, y, rotation) {
    var walkFrames = [];
    var stopFrame;

    const skins = ["assets/BlueMan/Skin01.png","assets/BlueMan/Skin02.png","assets/BlueMan/Skin03.png"];
    var skinId = 2;

    for (var i = 1; i < 4; i++) {
        walkFrames.push(PIXI.Texture.fromFrame('Ayak' + i + '.png'));
    }
    let walk = walkFrames;

    let man = new PIXI.Container;
    //man.avatar = new PIXI.Sprite.fromFrame('BMAvatar.png');
    man.avatar = new PIXI.Sprite.fromImage(skins[skinId]); //Create character with given sprite id
    
    man.gun = new PIXI.Sprite.fromImage("assets/BlueMan/Gun1.png")
    man.gun.anchor.set(0.5);
    man.gun.zOrder=2;
    
    man.addChild(man.gun);
    man.gun.position.set(50,-10);

    man.feet = new PIXI.extras.AnimatedSprite(walk);

    
    man.feet.anchor.set(0.5);
    man.addChild(man.feet);
    man.addChild(man.avatar);


    man.x = x;
    man.y = y;
    man.vx = 0;
    man.vy = 0;

    

    man.avatar.anchor.set(0.5);
    man.avatar.position.set(0,0);

    man.feet.animationSpeed = 0.15;
    man.feet.play("play");


    man.feet.position.set(0,-25);
    man.feet.zOrder = 1;

    man.tag = "man";

    man.health = 100;
    man.takeDamage = (amount) => {
        man.health -= amount;
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
            man.feet.gotoAndStop(1);
        } else {
            man.feet.play();
        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;
    }
    app.stage.addChild(man);
    return man;

}

module.exports = Man;
