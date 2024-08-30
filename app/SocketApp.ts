import { Server } from "socket.io";

export default class Socket{

    static connect(server:any){
      
      const io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET","HEAD","OPTIONS","POST","PUT"]
        }
      })
        

      io.on('connection', socket => { 
        console.log('client connected');
    
        //server send msg
        socket.emit('res', 'Wellcome my friend');

        //server receive msg
        socket.on('msg', (msg) => {
          io.emit('res', msg);
        });

        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
        
    });

    }
}




