
let CreateMPManager = (stage) => {


    let manager;
    manager.stage = stage;
    manager.drawObject = (data)=> {
        
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

        switch (comingData.flag) {
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