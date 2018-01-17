import {GridModel} from './GridModel.js';
import Coords from './Coords.js';

let typicalGridPattern = `
  -...-
  ...B-
  .A.C.
  -....
  -...-
`;


test('parsing a good grid', () => {
  let gridModel = new GridModel(typicalGridPattern);
});

test('parsing a bad grid', () => {
  expect(() => {
    new GridModel(`!`);
  }).toThrow();
});

test('getting the first selectable cell should work on a good grid', () => {
  let gridModel = new GridModel(typicalGridPattern);
  expect(gridModel.getFirstSelectableCell()).toEqual(new Coords(0,1));
});

test('getting the first selectable cell should not work on a bad grid', () => {
  let gridModel = new GridModel(`-----`);
  expect(() => {
    gridModel.getFirstSelectableCell();
  }).toThrow();
});

