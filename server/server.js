const path = require('path');

const publicPath = path.join(__dirname, '..', 'public/');
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');
const isRealString = require('./utils/validation');

// io.emit = everybody
// socket.io = only the user
// socket.broadcast.emit = everybody but the user

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    // console.log('Client connected shut down');
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Please fill in the name and field room');
    }
    callback();
    socket.join(params.room);
    socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Server', `${params.name} has joined the channel`));
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server started on port ${port}`));
