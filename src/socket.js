import { io } from "socket.io-client";

// URL Server Websocket
const URL = "http://127.0.0.1:5000";

export const socket = io(URL);
