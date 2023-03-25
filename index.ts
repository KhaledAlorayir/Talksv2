import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./lib/types";
import { joinSchema } from "./lib/schema";
import * as crud from "./lib/crud";

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("yay");

  socket.on("join", (args, callback) => {
    const validated = joinSchema.safeParse(args);

    if (!validated.success) {
      return callback(validated.error.issues);
    }

    const { subject } = validated.data;
    const waitingSocketId = crud.getWaitingSocket(subject);
    if (waitingSocketId) {
      const room = `${socket.id}-${waitingSocketId}-${subject.trim()}`;
      socket.join(room);
      io.sockets.sockets.get(waitingSocketId)?.join(room);
      crud.deleteFromQueueBySubject(subject);
      crud.setRoomToSocket(socket.id, room);
      crud.setRoomToSocket(waitingSocketId, room);
      io.to(room).emit("joined", { room });
    } else {
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
