

let CreateWebSocket = ()=>{

    var socketAddr = "127.0.0.1"
    var socketPort = ":8080"
    var socketRoute = "/ws"

    //var socket = new WebSocket("ws://"+socketAddr+ socketRoute+socketPort);
    var socket = new WebSocket("ws://"+socketAddr +socketPort+ socketRoute);


    socket.onopen = ()=> {
        //socket.send("Connected");
        console.log("Connected");
    }

    socket.onmessage = (msg)=> {
        //console.log("Message"+ msg.data );
    }
    socket.sendObject = (obj)=>{
        let msg = JSON.stringify(obj);
        socket.send(msg);
    }
    return socket;
}
module.exports = CreateWebSocket;