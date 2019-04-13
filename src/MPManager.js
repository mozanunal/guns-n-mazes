const sMan = require('./skinnedMan');
const sPlayerMan = require('./skinnedPlayerMan');

let CreateMPManager = (app) => {

    var manager = {};

    //manager.app = app;
    //manager.stage = stage;
    manager.drawObject = (data)=> {
        if(data.IsOwner) {
            let yourPlayer = sPlayerMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);
            app.stage.addChild(yourPlayer);
            app.playerMan = yourPlayer;

        } else {
            let newPlayer = sMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);
            app.stage.addChild(newPlayer);
        }
    }
    manager.destroyObject = (data) => {
        
    }

    manager.updateGame = (data)=> {

    }
    manager.adana = 1;

    //manager.handleComingData = (jsonData) => {
    manager.handleComingData = (jsonData) => {
        jsonData = jsonData.data;

        console.log(jsonData);
        console.log("Before parse");

        let comingData = JSON.parse(jsonData);
        /*
        if(comingData.type=="statepack") {
            let playersData = data.players;
            let firesData = data.fires;

            
        } else if(comingData.type=="welcome") {
            
        }
        */
       console.log("Before switch");
        switch (comingData.Flag) {
            case 0:
            manager.drawObject(comingData)
            break;
            case 1:
            manager.updateGame(comingData)
            break;
            case 2:
            manager.destroyObject(comingData)
            break;
            default:
            break;
        }
    }
    return manager;
}

module.exports = CreateMPManager;