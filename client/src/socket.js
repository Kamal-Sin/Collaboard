import {io} from "socket.io-client"

// Use environment variable for Socket.IO URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"

export const initsocket = async() => {
    const option = {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
    }
    return io(SOCKET_URL, option) 
}