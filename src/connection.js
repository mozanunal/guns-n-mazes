

let CreateWebSocket = ()=>{

    var socketAddr = "127.0.0.1"
    var socketPort = ":8080"
    var socketRoute = "/ws"
    var socket = new WebSocket("ws://"+socketAddr+ socketRoute+socketPort);

    socket.onopen = ()=> {
        socket.send("Connected");
    }

    socket.onmessage = ()=> {

    }
    socket.sendObject = (obj)=>{
        let msg = JSON.stringify(obj);
        socket.send(msg);
    }
    return socket;
}
module.exports = CreateWebSocket;