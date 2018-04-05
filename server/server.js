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

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client connected shut down');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

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
