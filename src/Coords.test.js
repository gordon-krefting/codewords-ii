import _ from 'lodash';

import Coords from './coords.js';

test('testing equals', () => {
  expect(new Coords(10,10)).toEqual(new Coords(10,10));
//  expect(new Coords(10,10) == new Coords(10,10)).toBeTruthy();

  expect(_.isEqual(new Coords(10,10), new Coords(10,10))).toBeTruthy();

});

test('testing not equals', () => {
  expect(new Coords(10,10)).not.toEqual(new Coords(10,9));
});
