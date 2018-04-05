const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

socket.on('newMessage', function (message) {
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text} `);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">Here is my location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
  }, function () {
    jQuery('[name=message]').val('');
  });
});

const locationBtn = jQuery('#share-location');
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by browser');
  }
  locationBtn.attr('disabled', 'true').text('Sharing Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    locationBtn.removeAttr('disabled').text('Share Location');
  }, function (err) {
    alert('There was an error fetching your location', err);
    locationBtn.removeAttr('disabled').text('Share Location');
  }, {
    enableHighAccuracy: true,
  });
});
