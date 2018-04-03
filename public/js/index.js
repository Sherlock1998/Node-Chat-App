const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text} `);
  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'The One',
  text: 'hello',
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
  }, function () {
    console.log('Got it');
  });
});
