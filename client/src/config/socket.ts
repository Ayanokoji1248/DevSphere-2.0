import { io, Socket } from "socket.io-client"
import { URL } from "../utils"

console.log(URL)

export const socket: Socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"]
})