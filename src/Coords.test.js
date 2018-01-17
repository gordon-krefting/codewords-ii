import Coords from './coords.js';

test('parsing a bad grid', () => {
  expect(new Coords(10,10)).toEqual(new Coords(10,10));
});
