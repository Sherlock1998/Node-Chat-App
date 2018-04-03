const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().toTimeString(),
});

module.exports = { generateMessage };
