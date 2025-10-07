import express from 'express'
import {createServer} from 'http'
import cors from 'cors'
import {Server} from 'socket.io'

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 
            "https://chat-app-sandy-psi-16.vercel.app",
        methods: ["GET", "POST"]
    }
})
    
io.on("connection", (socket) => {
    console.log("New Client Connected");

    socket.on('message', (message) => {
        console.log(`${message.user}: ${message.text}: ${message.time}`);
        io.emit("message", message)
    })

    // NEW: Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);  // Send to everyone except sender
    })

    // NEW: Handle stop typing event
    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    })

    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


