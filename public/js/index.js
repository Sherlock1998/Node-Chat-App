var socket = io();

socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url,
  });

  jQuery('#messages').append(html);
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

var locationBtn = jQuery('#share-location');
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
