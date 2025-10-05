import express from 'express'
import {createServer, METHODS} from 'http'
import cors from 'cors'
import {Server} from 'socket.io'

const app = express();
const server = createServer(app)
const io = new Server(server,           
    {cors:{
        origin:"https://socket-io-chat-app-frontend.vercel.app",    //cors is security measure of backend.HERE ONLY MENTIONED frontend's request is allowed to backend
        methods:["GET","POST"]
    }}
)
    
io.on("connection",(socket)=>{         //Connected Once when request send(here socket is a connection object)
    console.log("New Client Connected");

    socket.on('message',(message)=>{     //listens the request from client (first parameter => event(should be same for client and server),second parameter => message from client)
        console.log(`${message.user}: ${message.text}: ${message.time}`);
        io.emit("message",message)          //displays requests to all other clients
        
    })

    socket.on("disconnect",()=>{
        console.log("Client Disconnected");
        
    })
    
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

