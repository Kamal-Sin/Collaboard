import { Socket } from "dgram";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server=http.createServer(app)
const io=new Server(server);

// Store admin information
const roomAdmins = new Map();
io.on("connection",socket=>{
    console.log("you socket id is",socket.id)
    socket.on("join",({roomid})=>{
        socket.join(roomid)
        console.log(`${socket.id} joined ${roomid}`)
    })

    socket.on('drawing',({roomid,data})=>{
        console.log("drawing",roomid)
        socket.to(roomid).emit("r-drawing",data)
    })

    socket.on('send-attendance',({message})=>{
        console.log(message);
        socket.broadcast.emit('r-attendance',{message});
    })
    

    socket.on('sendreq',({message})=>{
        console.log('message name is ',message);
        socket.broadcast.emit('r-sendreq',{message})
    })

    socket.on('mark',({rollnumber})=>{
        console.log("meassagw",rollnumber);
        socket.broadcast.emit("r-mark",{rollnumber});
    })

    socket.on("leave",({roomid})=>{
        socket.leave(roomid)
        console.log("leave")
    })

    // Handle admin leaving
    socket.on('admin-leaving', ({ roomid }) => {
        // Notify all participants in the room that admin has left
        io.to(roomid).emit('admin-left');
        console.log(`Admin left room ${roomid}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
})
server.listen(5000,()=>{
    console.log("server is listing")
})