    function drawMap1(blockTexts,app) {
    
    blockSprites = [];

    blockSprites[0] = new PIXI.extras.TilingSprite(blockTexts[0],400,400);
    blockSprites[0].x = 0;
    blockSprites[0].y = -250;
    blockSprites[0].width = 400;
    blockSprites[0].height = 400;
    blockSprites[0].anchor.set(0.5);
    blockSprites[0].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[0]);

    blockSprites[1] = new PIXI.extras.TilingSprite(blockTexts[0]);
    blockSprites[1].x = 0;
    blockSprites[1].y = 800;
    blockSprites[1].width = 400;
    blockSprites[1].height = 400;
    blockSprites[1].anchor.set(0.5);
    blockSprites[1].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[1]);

    
    blockSprites[2] = new PIXI.extras.TilingSprite(blockTexts[0]);
    blockSprites[2].x = 1000;
    blockSprites[2].y = -250;
    blockSprites[2].width = 400;
    blockSprites[2].height = 400;
    blockSprites[2].anchor.set(0.5);
    blockSprites[2].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[2]);

    blockSprites[3] = new PIXI.extras.TilingSprite(blockTexts[0]);
    blockSprites[3].x = 1000;
    blockSprites[3].y = 800;
    blockSprites[3].width = 400;
    blockSprites[3].height = 400;
    blockSprites[3].anchor.set(0.5);
    blockSprites[3].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[3]);

    
    blockSprites[4] = new PIXI.extras.TilingSprite(blockTexts[1]);
    blockSprites[4].x = 500;
    blockSprites[4].y = 100;
    blockSprites[4].width = 800;
    blockSprites[4].height = 50;
    blockSprites[4].anchor.set(0.5);
    blockSprites[4].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[4]);

    blockSprites[5] = new PIXI.extras.TilingSprite(blockTexts[1]);
    blockSprites[5].x = 500;
    blockSprites[5].y = 380;
    blockSprites[5].width = 800;
    blockSprites[5].height = 50;
    blockSprites[5].anchor.set(0.5);
    blockSprites[5].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[5]);

    
    blockSprites[6] = new PIXI.extras.TilingSprite(blockTexts[2]);
    blockSprites[6].x = -100;
    blockSprites[6].y = 290;
    blockSprites[6].width = 50;
    blockSprites[6].height = 300;
    blockSprites[6].anchor.set(0.5);
    blockSprites[6].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[6]);

    blockSprites[7] = new PIXI.extras.TilingSprite(blockTexts[2]);
    blockSprites[7].x = 1100;
    blockSprites[7].y = 290;
    blockSprites[7].width = 50;
    blockSprites[7].height = 300;
    blockSprites[7].anchor.set(0.5);
    blockSprites[7].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[7]);

    blockSprites[9] = new PIXI.extras.TilingSprite(blockTexts[3]);
    blockSprites[9].x = -600;
    blockSprites[9].y = 400;
    blockSprites[9].width = 100;
    blockSprites[9].height = 2400;
    blockSprites[9].anchor.set(0.5);
    blockSprites[9].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[9]);

    
    blockSprites[10] = new PIXI.extras.TilingSprite(blockTexts[3]);
    blockSprites[10].x = 1700;
    blockSprites[10].y = 400;
    blockSprites[10].width = 100;
    blockSprites[10].height = 2400;
    blockSprites[10].anchor.set(0.5);
    blockSprites[10].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[10]);

    blockSprites[11] = new PIXI.extras.TilingSprite(blockTexts[4]);
    blockSprites[11].x = 500;
    blockSprites[11].y = -700;
    blockSprites[11].width = 2400;
    blockSprites[11].height = 100;
    blockSprites[11].anchor.set(0.5);
    blockSprites[11].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[11]);

    
    blockSprites[12] = new PIXI.extras.TilingSprite(blockTexts[4]);
    blockSprites[12].x = 500;
    blockSprites[12].y = 1400;
    blockSprites[12].width = 2400;
    blockSprites[12].height = 100;
    blockSprites[12].anchor.set(0.5);
    blockSprites[12].animationSpeed = 0.15;
    app.stage.addChild(blockSprites[12]);
    }

    module.exports = drawMap1;