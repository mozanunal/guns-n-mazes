const sMan = require('./skinnedMan');
const sPlayerMan = require('./skinnedPlayerMan');
const Fire = require('./fire');

let CreateMPManager = (app) => {

    var manager = {};

    //manager.app = app;
    //manager.stage = stage;
    var players = {};
    manager.destroyObject = (data) => {
        if(data.Player!=undefined&&data.Player!=null) {
            if(players[data.Id]!=undefined) { 
                players[data.Id].destroy();
                //console.log("Player is destroyed");
                //console.log(players[data.Id]);
            }
        }
    }
    manager.updateGame = (data)=> {
        
        var playerDatas = data.Players;
        if(data.Players!=undefined&&data.Players!=null) {
        playerDatas.forEach(function(playerData) {
            //console.log(playerData);
            if(players[playerData.Id]!=undefined) {
            players[playerData.Id].x = playerData.PosX;
            players[playerData.Id].y = playerData.PosY;
            players[playerData.Id].vx = playerData.Vx;
            players[playerData.Id].vy = playerData.Vy;
            players[playerData.Id].rotation = playerData.Rot;
            //players[playerData.Id].health = playerData.Health;
            //players[playerData.Id].ammo = playerData.Ammo;

            }
          });
        }
        
    }
    manager.createFire = (data)=>{
        var newFire = Fire(app, data.X, data.Y, data.Rot);
    }
    
    manager.createPlayer = (data)=> {
        console.log(data);

        if(data.IsOwner==true) {
            let yourPlayer = sPlayerMan(app, data.Player.PosX, data.Player.PosY, 0, manager);
            app.stage.addChild(yourPlayer);
            app.playerMan = yourPlayer;
            players[data.Id] = app.playerMan;
            console.log("Create player man");
        } else {
            let newPlayer = sMan(app,  data.Player.PosX, data.Player.PosY, 0);
            app.stage.addChild(newPlayer);
            players[data.Id]=newPlayer;
            console.log("Create man");

        } 
    }
    manager.createOwnPlayer = (data) =>{
            let yourPlayer = sPlayerMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(yourPlayer);
            app.playerMan = yourPlayer;
            players[data.Id] = app.playerMan;
            console.log("Create player man");


    }
    manager.createOtherPlayers = (data)=>{
            let newPlayer = sMan(app, data.PosX, data.PosY, 0);
            app.stage.addChild(newPlayer);
            players[data.Id]=newPlayer;
            console.log("Create man");

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