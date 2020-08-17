const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./public/utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./public/utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'chatcord Bot'
// RUn when client connects

io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {
        
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to chatcord'));  
        
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} joined`)); 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    })
    
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    })
      

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        io.emit('message', formatMessage(botName, (user)? `${user.username} Left`: `USER Left`));
    })
});

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});