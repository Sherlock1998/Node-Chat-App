const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

// Emits || Client > Server
socket.emit('createMessage', {
  to: 'yj@google.com',
  text: 'hello sir',
});


// Listens || Server > Client
socket.on('newMessage', function (message) {
  console.log('New message', message);
});

