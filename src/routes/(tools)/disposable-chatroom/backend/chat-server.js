// WebSocket server (Socket.IO)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
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
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
