const sMan = require('./skinnedMan');
const sPlayerMan = require('./skinnedPlayerMan');

let CreateMPManager = (app) => {


    let manager;
    manager.app = app;
    //manager.stage = stage;
    manager.drawObject = (data)=> {
        if(data.IsOwner) {
            let newPlayer = sPlayerMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);
        } else {
            let newPlayer = sMan(app, app.screen.width / 2, (app.screen.height / 2)-50, 0);

        }
    }
    manager.destroyObject = (data) => {
        
    }

    manager.updateGame = (data)=> {

    }

    manager.handleComingData = (jsonData) => {
        let comingData = JSON.parse(jsonData);
        if(comingData.type=="statepack") {
            let playersData = data.players;
            let firesData = data.fires;

            
        } else if(comingData.type=="welcome") {
            
        }

        switch (comingData.Flag) {
            case 0:
            drawObject(comingData)
            break;
            case 1:
            updateGame(comingData)
            break;
            case 2:
            destroyObject(comingData)
            break;
            default:
            break;
        }
    }
}

module.exports = CreateMPManager;