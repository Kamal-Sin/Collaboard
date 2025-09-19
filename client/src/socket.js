import {io} from "socket.io-client"

// Use the same domain for both API and Socket connections in production
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (import.meta.env.PROD ? window.location.origin : "http://localhost:5000")

export const initsocket = async() => {
    const option = {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
    }
    return io(SOCKET_URL, option) 
}