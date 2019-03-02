'use strict';

const calc = require('../misc/calculation');


const SPEED = 10;

function Fire (app, x, y, rotation ) {
    
    var sprite = PIXI.Sprite.fromImage('assets/cat/cat.png');
    // Set the initial position
    sprite.anchor.set(0.5);
    sprite.rotation = rotation;
    sprite.lifetime = 0;
    sprite.scale.x = 0.25;
    sprite.scale.y = 0.25;
    sprite.x = x;
    sprite.y = y;
    sprite.vx = calc.getAngleX(SPEED, rotation);
    sprite.vy = calc.getAngleY(SPEED, rotation);

    sprite.objTick = function (delta) {
        sprite.x += sprite.vx * delta;
        sprite.y += sprite.vy * delta;
        sprite.lifetime += delta;
        if (sprite.lifetime > 60){
            console.log("Removing chield at: "+ app.stage.getChildIndex(sprite) );
            app.stage.removeChildAt(app.stage.getChildIndex(sprite));
        }
    }
    app.stage.addChild(sprite);
    return sprite;
}

module.exports = Fire;
