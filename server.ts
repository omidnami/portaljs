import { App } from "./configs/app"
import { StartQueue } from "./configs/queue"
var http = require('http');
import Socket from "./app/SocketApp";
const server = http.createServer(App); 

// socket connection on portocol ws or wss
if (process.env.SOCKET === "true"){
    Socket.connect(server)
    console.log('socket enabled');
}

// server conect on portocol http or https
App.listen((process.env.PORT || 3008),()=>{
    StartQueue()
    console.log("Server is Running by : "+ process.env.PROJECT_NAME +" port: "+process.env.PORT)
    // console.log('The solution is: ', JSON.stringify(msql));
})