import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const rooms = {};

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ roomId, userName }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(socket.id);

        socket.join(roomId);
        io.to(roomId).emit('userJoined', { userName });

        socket.on('message', (message) => {
            io.to(roomId).emit('message', { userName, message });
        });

        socket.on('disconnect', () => {
            rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
            if (rooms[roomId].length === 0) {
                delete rooms[roomId];
                io.to(roomId).emit('roomDeleted');
            } else {
                io.to(roomId).emit('userLeft', { userName });
            }
        });
    });

    socket.on('createRoom', ({ userName }) => {
        const roomId = Math.random().toString(36).substr(2, 9);
        rooms[roomId] = [socket.id];

        socket.join(roomId);
        socket.emit('roomCreated', { roomId, userName });
        io.to(roomId).emit('userJoined', { userName });

        socket.on('message', (message) => {
            io.to(roomId).emit('message', { userName, message });
        });

        socket.on('disconnect', () => {
            rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
            if (rooms[roomId].length === 0) {
                delete rooms[roomId];
                io.to(roomId).emit('roomDeleted');
            } else {
                io.to(roomId).emit('userLeft', { userName });
            }
        });
    });
});

server.listen(5173, 'disposable-chatroom', () => {
    console.log('Server is running on port 5173');
});
