'use strict';

const calc = require('../misc/calculation');
const collision = require('./collision');


const SPEED = 10;
const MAX_LIFETIME = 60;

function Fire (app, x, y, rotation ) {
    
    var sprite = PIXI.Sprite.fromImage('assets/cat/cat.png');
    // Set the initial position
    sprite.anchor.set(0.5);
    sprite.rotation = rotation;
    sprite.scale.x = 0.25;
    sprite.scale.y = 0.25;
    sprite.x = x;
    sprite.y = y;
    sprite.vx = calc.getAngleX(SPEED, rotation);
    sprite.vy = calc.getAngleY(SPEED, rotation);
    sprite.lifetime = 0; 
    sprite.isCircular = true; // Has circular collission detection
    sprite.r = 5; //Collider radius is 5 


    sprite.objTick = function (delta) {
        sprite.x += sprite.vx * delta;
        sprite.y += sprite.vy * delta;
        
        sprite.objCollider();
        sprite.lifetime += delta;
        if(sprite.lifetime > MAX_LIFETIME)
        {
            sprite.destroy();
        }
    }
    sprite.colCounter = 0;
    sprite.objCollider = function() {
        //console.log(app.stage);
        sprite.colCounter++;
        if(sprite.colCounter>0) {
            var t1 = performance.now; 
            
            for(var i=0;i<app.stage.children.length;i++) {
                var element = app.stage.children[i];
                if(element!=sprite) {
                    var colliding = collision.CalculateCollision(sprite,element);
                    if(colliding[0]==true) {
                        //collision.PlayerCollisionEffect(sprite,colliding[1]);
                        //console.log("Hitted to");
                        //console.log(element);

                        if(element.tag==="man") {
                            console.log("Hit man");
                            element.takeDamage(10);
                        }

                        sprite.destroy();
                        //sprite.objCollider = ()=>{};
                        //console.log(sprite);
                        return;
                        
                    }
                    
                } 
            }

            var t2 = performance.now; 
            //console.log("Past time",(t2-t1));
            sprite.colCounter=0;
        }   
        
    }
    app.stage.addChild(sprite);
    return sprite;
}

module.exports = Fire;
