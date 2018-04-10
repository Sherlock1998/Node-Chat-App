var socket = io();

function scrollBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // Height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
  });
});

socket.on('roomName', function (roomName) {
  var template = jQuery('#room-name').html();
  var html = Mustache.render(template, {
    room: roomName,
  });
  jQuery('#room').append(html);
});

socket.on('disconnect', function () {
  console.log('Disconnected to the server');
});

socket.on('updateUsersList', function (usersList) {
  var ul = jQuery('<ul></ul>');

  usersList.forEach((user) => {
    var iconColors = ['#E64980', '#6ABBC8', '#FF7F50'];
    var randomize = iconColors[getRandomInt(iconColors.length)];
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    ul.append(jQuery(`<li><i class="fas fa-user-secret people__icon" style="color:${randomize}"></i>${user}</li>`));
  });

  jQuery('#people').html(ul);
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
  scrollBottom();
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
  scrollBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
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
  locationBtn.attr('disabled', 'true');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    locationBtn.removeAttr('disabled');
  }, function (err) {
    alert('There was an error fetching your location', err);
    locationBtn.removeAttr('disabled');
  }, {
    enableHighAccuracy: true,
  });
});
