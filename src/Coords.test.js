import Coords from './coords.js';

test('testing equals', () => {
  expect(new Coords(10,10)).toEqual(new Coords(10,10));
});

test('testing not equals', () => {
  expect(new Coords(10,10)).not.toEqual(new Coords(10,9));
});
