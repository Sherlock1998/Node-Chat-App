const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().toTimeString(),
});

const generateLocationMessage = ((from, latitude, longitude) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().toTimeString(),
}));

module.exports = { generateMessage, generateLocationMessage };
