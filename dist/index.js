"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer);
let queue = new Map();
let rooms = new Map();
io.on("connection", (socket) => {
    console.log("yay");
    //check if already in queue or in room
    // on leave chat
    socket.on("join", ({ subject }) => {
        var _a;
        const waitingSocketId = queue.get(subject);
        if (waitingSocketId) {
            const room = `${socket.id}-${waitingSocketId}-${subject.trim()}`;
            socket.join(room);
            (_a = io.sockets.sockets.get(waitingSocketId)) === null || _a === void 0 ? void 0 : _a.join(room);
            queue.delete(subject);
            rooms.set(socket.id, room);
            rooms.set(waitingSocketId, room);
            io.to(room).emit("joined", { room });
        }
        else {
            queue.set(subject, socket.id);
        }
    });
    socket.on("message", ({ message }) => {
        const room = rooms.get(socket.id);
        if (room) {
            socket.broadcast.to(room).emit("receive", { message });
        }
    });
    // remove from queue/room on disconnect
    socket.on("disconnect", () => {
        console.log("nah");
    });
});
httpServer.listen(3030);
