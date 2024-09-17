import { App } from "./configs/app"
var http = require('http');
import Socket from "./app/SocketApp";
const server = http.createServer(App); 

// socket connection on portocol ws or wss
if (process.env.SOCKET === "true"){ 
    Socket.connect(server)
    console.log('socket enabled');
}

// server conect on portocol http or https
App.listen(process.env.PORT || 3008,'185.88.179.252', ()=>{
    console.log("Server is Running at : "+ process.env.PROJECT_NAME +" port: "+process.env.PORT+ ' or' + 3008)
    // console.log('The solution is: ', JSON.stringify(msql));
})