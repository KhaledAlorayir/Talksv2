"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketRoom = exports.setToQueue = exports.setRoomToSocket = exports.deleteFromQueueBySocket = exports.deleteFromQueueBySubject = exports.getWaitingSocket = void 0;
let queue = new Map();
let rooms = new Map();
function getWaitingSocket(subject) {
    return queue.get(subject);
}
exports.getWaitingSocket = getWaitingSocket;
function deleteFromQueueBySubject(subject) {
    queue.delete(subject);
}
exports.deleteFromQueueBySubject = deleteFromQueueBySubject;
function deleteFromQueueBySocket(socketId) {
    let queue_key = null;
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
exports.deleteFromQueueBySocket = deleteFromQueueBySocket;
function setRoomToSocket(socketId, room) {
    rooms.set(socketId, room);
}
exports.setRoomToSocket = setRoomToSocket;
function setToQueue(socketId, subject) {
    queue.set(subject, socketId);
}
exports.setToQueue = setToQueue;
function getSocketRoom(socketId) {
    return rooms.get(socketId);
}
exports.getSocketRoom = getSocketRoom;
