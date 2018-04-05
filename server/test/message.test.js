const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('../utils/message');

describe('Generate Message', () => {
  it('generate the correct message', () => {
    const from = 'YJ';
    const text = 'This is some text';
    const message = generateMessage(from, text);

    expect(message).toMatchObject({ from, text });
  });
});

describe('Generate Location Message', () => {
  it('generate the correct Message & URL', () => {
    const from = 'YJ';
    const lat = 3.1085075;
    const lon = 101.7594018;
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    const message = generateLocationMessage(from, lat, lon);
    expect(message).toMatchObject({ from, url });
  });
});

