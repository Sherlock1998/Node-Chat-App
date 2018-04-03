const expect = require('expect');
const { generateMessage } = require('../utils/message');

describe('Generate Message', () => {
  it('generate the correct message', () => {
    const from = 'YJ';
    const text = 'This is some text';
    const message = generateMessage(from, text);

    expect(message).toMatchObject({ from, text  });
  });
});
