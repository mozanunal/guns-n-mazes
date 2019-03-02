'use strict';

const Fire = require('./fire');
const calc = require('../misc/calculation');
const keyboard = require('../misc/keyboard');
const Mouse = require('pixi.js-mouse');
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
        man.rotation = calc.getAngleTo(Mouse.getPosX(), Mouse.getPosY(), man.x, man.y);
        if (man.vx == 0 && man.vy == 0) {
            man.gotoAndStop(1);
        } else {
            man.play();
        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    let keyObjectUp = keyboard("ArrowUp");
    let keyObjectDown = keyboard("ArrowDown");
    let keyObjectLeft = keyboard("ArrowLeft");
    let keyObjectRight = keyboard("ArrowRight");

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

    app.stage.addChild(man);
    return man;

}


module.exports = man;