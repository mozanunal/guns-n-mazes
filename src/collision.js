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
var CollisionModule = {
    CalculateCollision : CalculateCollision,
    CollisionCalculatorB2B : CollisionCalculatorB2B,
    CollisionCalculatorC2B: CollisionCalculatorC2B,
    CollisionCalculatorC2C: CollisionCalculatorC2C,
    CollisionCalculatorC2P: CollisionCalculatorC2P


}
module.exports = CollisionModule;