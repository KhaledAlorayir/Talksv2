import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../lib/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3030/"
);
