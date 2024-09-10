import { Server } from "socket.io";

export function setUpSocket(io:Server){
    io.on("connection", socket=>{
        console.log("The Socket is connected...", socket.id);
    
        socket.on("message", (data)=>{
            console.log("message : " + JSON.stringify(data));
            socket.broadcast.emit("message", data);
        })

        socket.on("disconnect", ()=>{
        console.log("The Socket is disconnected . . .", socket.id);
        })
    
    })

}