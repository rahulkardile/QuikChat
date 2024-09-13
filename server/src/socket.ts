import { Server, Socket } from "socket.io";
import errorHandler from "./utils/errorHandler";

interface CustomSocket extends Socket {
    room?: string
}

export function setUpSocket(io:Server){

    io.use((socket: CustomSocket, next)=>{
        const room = socket.handshake.auth.room
        if(!room){
           return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
    })

    io.on("connection", (socket:CustomSocket)=>{

        // Join Room
        socket.join(socket.room!)

        console.log("The Socket is connected...", socket.id);
    
        socket.on("message", (data)=>{
            console.log("message : " + JSON.stringify(data));
            // socket.broadcast.emit("message", data);
            console.log(socket.room);
            
            io.to(socket.room!).emit("message", data);

        })

        socket.on("disconnect", ()=>{
        console.log("The Socket is disconnected . . .", socket.id);
        })
    
    })

}