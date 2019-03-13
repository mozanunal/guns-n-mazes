
'use strict';

const HB_LEN = 100;
const HB_THICKNESS = 12;

function HealthBar() {
    //Create the health bar
    let healthBar = new PIXI.Container();
    healthBar.position.set(-HB_LEN/2, 60);
      
    //Create the front red rectangle
    let outerBar = new PIXI.Graphics();
    outerBar.beginFill(0x000000);
    outerBar.drawRect(0, 0, HB_LEN, HB_THICKNESS);
    outerBar.endFill();
    healthBar.addChild(outerBar);
    healthBar.outer = outerBar;

    //Create the black background rectangle
    let innerBar = new PIXI.Graphics();
    innerBar.beginFill(0xFF3300);
    innerBar.drawRect(0, HB_THICKNESS/4, HB_LEN/2, HB_THICKNESS/2);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    healthBar.innerBar = innerBar;
    healthBar.outerBar = outerBar;

    healthBar.setHealth = function ( health ) {
       healthBar.removeChild(healthBar.innerBar);

       let innerBar = new PIXI.Graphics();
       innerBar.beginFill(0xFF3300);
       innerBar.drawRect(0, HB_THICKNESS/4, health, HB_THICKNESS/2);
       innerBar.endFill();
       healthBar.addChild(innerBar);
       healthBar.innerBar = innerBar;
    }

    return healthBar;
}



module.exports = HealthBar;
