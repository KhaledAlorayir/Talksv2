let queue = new Map<string, string>();
let rooms = new Map<string, string>();

export function getWaitingSocket(subject: string) {
  return queue.get(subject);
}

export function deleteFromQueueBySubject(subject: string) {
  queue.delete(subject);
}

export function deleteFromQueueBySocket(socketId: string) {
  let queue_key: null | string = null;

  for (let [key, value] of queue.entries()) {
    if (socketId === value) {
      queue_key = key;
      break;
    }
  }

  if (queue_key) {
    queue.delete(queue_key);
  }
}

export function setRoomToSocket(socketId: string, room: string) {
  rooms.set(socketId, room);
}

export function setToQueue(socketId: string, subject: string) {
  queue.set(subject, socketId);
}

export function getSocketRoom(socketId: string) {
  return rooms.get(socketId);
}
