"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const schema_1 = require("./lib/schema");
const crud = __importStar(require("./lib/crud"));
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    console.log("yay");
    socket.on("join", (args, callback) => {
        var _a;
        const validated = schema_1.joinSchema.safeParse(args);
        if (!validated.success) {
            return callback(validated.error.issues);
        }
        const { subject } = validated.data;
        const waitingSocketId = crud.getWaitingSocket(subject);
        if (waitingSocketId) {
            const room = `${socket.id}-${waitingSocketId}-${subject.trim()}`;
            socket.join(room);
            (_a = io.sockets.sockets.get(waitingSocketId)) === null || _a === void 0 ? void 0 : _a.join(room);
            crud.deleteFromQueueBySubject(subject);
            crud.setRoomToSocket(socket.id, room);
            crud.setRoomToSocket(waitingSocketId, room);
            io.to(room).emit("joined", { room });
        }
        else {
            crud.setToQueue(socket.id, subject);
            socket.emit("waiting");
        }
    });
    socket.on("message", ({ message }) => {
        const room = crud.getSocketRoom(socket.id);
        if (room) {
            socket.broadcast.to(room).emit("receive", { message });
        }
    });
    socket.on("leave", (callback) => {
        const room = crud.getSocketRoom(socket.id);
        if (room) {
            socket.leave(room);
            console.log("hit");
            callback();
            io.to(room).emit("alone");
        }
    });
    // remove from queue/room on disconnect
    socket.on("disconnect", () => {
        crud.deleteFromQueueBySocket(socket.id);
        console.log("nah");
    });
});
httpServer.listen(3030);
