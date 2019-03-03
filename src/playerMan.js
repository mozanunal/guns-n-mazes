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

    man.r = 50;
    man.isCircular = true; 
    man.objCollider = function() {
        //console.log(app.stage);
        man.colCounter++;
        if(man.colCounter>0) {
            var t1 = performance.now; 
            app.stage.children.forEach(element => {
                if(element!=man) {

                    var colliding = CalculateCollision(man,element);
                    if(colliding[0]==true) {
                        switch (colliding[1]) {
                            case "topMiddle":
                              if(man.vy>0) {man.vy=0;}
                              break;
                    
                            case "leftMiddle":
                              if(man.vx>0) {man.vx=0;}
                              break;
                    
                            case "bottomMiddle":
                              if(man.vy<0) {man.vy=0;}
                              break;
                    
                            case "rightMiddle":
                              if(man.vx<0) {man.vx=0;}
                              break;
                            case "topLeft":
                              if(man.vy>0) {man.vy=0;}
                              if(man.vx>0) {man.vx=0;}
                              break;
                    
                            case "topRight":
                            if(man.vy>0) {man.vy=0;}
                            if(man.vx<0) {man.vx=0;}
                              break;
                    
                            case "bottomLeft":
                             if(man.vx>0) {man.vx=0;}
                              if(man.vy<0) {man.vy=0;}
                              break;
                    
                            case "bottomRight":
                            if(man.vx<0) {man.vx=0;}
                            if(man.vy<0) {man.vy=0;}
                              break;
                          }
                    }
                    /*
                    var isCollide = CollisionCalculatorB2B(man,element);
                    if(isCollide) {
                        //console.log("You have interferance with", element);
                        var colPoint = OnCollisionEnter(man,element);
                        console.log(colPoint);
                        switch (colPoint) {
                            case 8:
                                if(man.vy<0) {man.vy=0;}
                                break;
                            case 2:
                                if(man.vy>0) {man.vy=0;}
                                break;
                            case 4:
                                if(man.vx<0) {man.vx=0;}
                                break;
                            case 6:
                                if(man.vx>0) {man.vx=0;}
                                break;
                        
                            default:
                                break;
                        }
                    }
                    */
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
//Collision Calculate Box to Box
function CalculateCollision(o1,o2) {
    if(o1.isCircular&&o2.isCircular) {
        return CollisionCalculatorC2C(o1,o2);
    } 
    if(o1.isCircular&&(o2.isCircular==undefined||o2.isCircular==false)) {
        return CollisionCalculatorC2B(o1,o2);
    }
    return CollisionCalculatorB2B(o1,o2);
}
function CollisionCalculatorB2B(o1,o2) {
    //console.log(o1,o2);
    var dx = o2.x - o1.x;
    var dy = o2.y - o1.y;
    if(Math.abs(dx)>o1.width/2+o2.width/2){
        return false;
    }
    if(Math.abs(dy)>o1.height/2+o2.height/2)
    {
        return false;
    }
    return true;
}
//Collicion Calculate Circle with a Point
function CollisionCalculatorC2P(o1,pt) 
{
    var dx = pt.x - o1.x;
    var dy = pt.y - o1.y;

    var dist = Math.sqrt( Math.pow((pt.x-o1.x),2)+Math.pow((pt.y-o1.y),2));
    if(dist>o1.r) {
        return false;
    }
    return true;
}
//COllision Calculate Circle to Circle
function CollisionCalculatorC2C(o1,o2) {
    //console.log(o1,o2);
    var dist = Math.sqrt( Math.pow((o2.x-o1.x),2)+Math.pow((o2.y-o1.y),2));
    var totalR = o2.r + o1.r;
    if(dist>totalR){
        return false;
    }
    /*
        var colPoint = new Point( o2.x + (o1.position.x-o2.position.x)*o2.r/(o2.r+o1.r),o2.y + (o1.position.y-o2.position.y)*o2.r/(o2.r+o1.r);
    */

   var region = "";
   if (o1.y < o2.y - Math.abs(o2.height/2)) {

       //If it is, we need to check whether it's in the
       //top left, top center or top right
       if (o1.x < o2.x - 1 - Math.abs(o2.width/2)) {
         region = "topLeft";
       } else if (o1.x > o2.x + 1 + Math.abs(o2.width/2)) {
         region = "topRight";
       } else {
         region = "topMiddle";
       }
     }

     else if ((o1.y >  o2.y + Math.abs(o2.height/2))) {

       //If it is, we need to check whether it's in the bottom left,
       //bottom center, or bottom right
       if (o1.x < o2.x - 1 - Math.abs(o2.width/2)) {
         region = "bottomLeft";
       } else if (o1.x > o2.x + 1 + Math.abs(o2.width/2)) {
         region = "bottomRight";
       } else {
         region = "bottomMiddle";
       }
     } 
     else {
       if (o1.x < o2.x - Math.abs(o2.width/2)) {
         region = "leftMiddle";
       } else {
         region = "rightMiddle";
       }
     }

    //return true;
    return [true,region];
}
function CollisionCalculatorC2B(o1,o2) {
    //console.log(o1,o2);
    var dx = o2.x - o1.x;
    var dy = o2.y - o1.y;

    var region = "";
    if (o1.y < o2.y - Math.abs(o2.height/2)) {

        //If it is, we need to check whether it's in the
        //top left, top center or top right
        if (o1.x < o2.x - 1 - Math.abs(o2.width/2)) {
          region = "topLeft";
        } else if (o1.x > o2.x + 1 + Math.abs(o2.width/2)) {
          region = "topRight";
        } else {
          region = "topMiddle";
        }
      }

      else if ((o1.y >  o2.y + Math.abs(o2.height/2))) {

        //If it is, we need to check whether it's in the bottom left,
        //bottom center, or bottom right
        if (o1.x < o2.x - 1 - Math.abs(o2.width/2)) {
          region = "bottomLeft";
        } else if (o1.x > o2.x + 1 + Math.abs(o2.width/2)) {
          region = "bottomRight";
        } else {
          region = "bottomMiddle";
        }
      } 
      else {
        if (o1.x < o2.x - Math.abs(o2.width/2)) {
          region = "leftMiddle";
        } else {
          region = "rightMiddle";
        }
      }
      if (region === "topMiddle" || region === "bottomMiddle" || region === "leftMiddle" || region === "rightMiddle") {

        //Yes, it is, so do a standard rectangle vs. rectangle collision test
        var collision = CollisionCalculatorB2B(o1, o2, global);
        return [collision,region];
      }
      else {
        let point = {};

        switch (region) {
          case "topLeft":
            point.x = o2.x-o2.width/2;
            point.y = o2.y-o2.height/2;
            break;
  
          case "topRight":
            point.x = o2.x + o2.width/2;
            point.y = o2.y-o2.height/2;
            break;
  
          case "bottomLeft":
            point.x = o2.x - o2.width/2;
            point.y = o2.y + o2.height/2;
            break;
  
          case "bottomRight":
            point.x = o2.x + o2.width/2;
            point.y = o2.y + o2.height/2;
            break;
        }
        var isColliding = CollisionCalculatorC2P(o1,point);
        if(isColliding) {
            return [true, region];
        }
        return false;
      }
    }
function OnCollisionEnter(o1,o2) {
    var dx = o2.x - o1.x;
    var dy = o2.y - o1.y;
    if(Math.abs(o1.width/2+o2.width/2-Math.abs(dx))>Math.abs(o1.height/2+o2.height/2-Math.abs(dy))) {
        if(dy<0) {
        console.log("Top Interferance");
            return 8;
        } else {
        console.log("Bottom Interferance");
            return 2;
        }
    } else {
        if(dx>0) {
            console.log("Right Interferance");
            return 6;
            } else {
            console.log("Left Interferance");
            return 4;
    
            }
    }
}


module.exports = man;