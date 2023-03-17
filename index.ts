import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

let queue = new Map<string, string>();
let rooms = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("yay");
  //check if already in queue or in room
  // on leave chat

  socket.on("join", ({ subject }) => {
    const waitingSocketId = queue.get(subject);
    if (waitingSocketId) {
      const room = `${socket.id}-${waitingSocketId}-${subject.trim()}`;
      socket.join(room);
      io.sockets.sockets.get(waitingSocketId)?.join(room);
      queue.delete(subject);
      rooms.set(socket.id, room);
      rooms.set(waitingSocketId, room);
      io.to(room).emit("joined", { room });
    } else {
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
