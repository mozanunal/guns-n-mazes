
'use strict';

const SPEED = 10;

function Man ( x, y, rotation ) {
    var walkFrames = [];
    var stopFrame;
    for (var i = 1; i < 4; i++) {
        var val = i;

        // magically works since the spritesheet was loaded with the pixi loader
        walkFrames.push(PIXI.Texture.fromFrame('W' + val + '.png'));
    }
    let walk = walkFrames;
    let stop = [walkFrames[1]];
    //let mc = new AnimatedSprite(walk,stop);

    //man = new PIXI.extras.AnimatedSprite(walkFrames);
    let man = new PIXI.extras.AnimatedSprite(walk, stop);
    //man = new AnimatedSprite(walk,stop);
    man.play(0);
    man.x = x;
    man.y = y;
    man.vx = 0;
    man.vy = 0;
    man.anchor.set(0.5);
    man.animationSpeed = 0.15;
    man.play("play");

    man.objTick = function (delta) {
        if (man.vx == 0 && man.vy == 0) {
            // man.stop();
            man.gotoAndStop(1);

        } else {
            // man.play();
            man.play();
            man.go

        }
        man.x += man.vx * delta;
        man.y += man.vy * delta;
    }

    return man;

}

module.exports = Man;
