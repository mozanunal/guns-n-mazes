const sMan = require('./skinnedMan');
const sPlayerMan = require('./skinnedPlayerMan');

let CreateMPManager = (app) => {

    var manager = {};

    //manager.app = app;
    //manager.stage = stage;
    var players = {};
    manager.destroyObject = (data) => {
        
    }
    manager.updateGame = (data)=> {
        var playerDatas = data.Players;
        if(data.Players!=undefined&&data.Players!=null) {
        playerDatas.forEach(function(playerData) {
            players[playerData.Id].x = playerData.PlayerData.PosX;
            players[playerData.Id].y = playerData.PlayerData.PosY;
            players[playerData.Id].vx = playerData.PlayerData.Vx;
            players[playerData.Id].vy = playerData.PlayerData.Vy;
            players[playerData.Id].rotation = playerData.PlayerData.Rot;
          });
        }
    }
    
    manager.createFire = (data)=>{
    }
    manager.createPlayer = (data)=> {
        if(data.IsOwner) {
            let yourPlayer = sPlayerMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(yourPlayer);
            app.playerMan = yourPlayer;
            players[data.Id] = app.playerMan;
        } else {
            let newPlayer = sMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(newPlayer);
            players[data.Id]=newPlayer;
        } 
    }
    manager.createOwnPlayer = (data) =>{
            let yourPlayer = sPlayerMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(yourPlayer);
            app.playerMan = yourPlayer;
            players[data.Id] = app.playerMan;

    }
    manager.createOtherPlayers = (data)=>{
            let newPlayer = sMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(newPlayer);
            players[data.Id]=newPlayer;
    }
    manager.createGame = (data)=>{
        manager.createOwnPlayer(data.Player);
        //console.log(data.OtherPlayers);
        if(data.OtherPlayers!=null) {
        data.OtherPlayers.forEach(function(playerData) {
            manager.createOtherPlayers(playerData);
          });
        }
        
        
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
        switch (comingData.Mtype) {
            case 0:
            manager.updateGame(comingData);
            break;
            case 1:
            manager.createFire(comingData);
            break;
            case 2:
            manager.createPlayer(comingData);
            break;
            case 3:
            manager.destroyObject(comingData)
            break;
            case 4:
            manager.createGame(comingData);
            break;
            default:
            break;
        }
    }
    return manager;
}

module.exports = CreateMPManager;