const expect = require('expect');
const isRealString = require('../utils/validation');

describe('isRealString', () => {
  it('rejects non string values', () => {
    const res = isRealString(1);
    expect(res).toBeFalsy();
  });
  it('rejects string with only spaces', () => {
    const res = isRealString('     ');
    expect(res).toBeFalsy();
  });
  it('allows string with non-space characters', () => {
    const res = 'yj223';
    expect(res).toBeTruthy();
  });
});
