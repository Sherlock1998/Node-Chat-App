const path = require('path');

const publicPath = path.join(__dirname, '..', 'public/');
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client connected shut down');
  });

  // Emits || Server > Client
  socket.emit('newMessage', {
    from: 'Dan@google.com',
    text: 'hello sir',
    createAt: new Date().toTimeString(),
  });

  // Listens || Client > Server
  socket.on('createMessage', (newEmail) => {
    console.log('New Email', newEmail);
  });
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server started on port ${port}`));
