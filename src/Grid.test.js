import {GridModel} from './GridModel.js';
import Grid from './Grid.js';
import React from 'react';
import renderer from 'react-test-renderer';

let gridPattern = `
	-...-
	...B-
	.A.C.
	-....
	-...-
`;
let gridModel = new GridModel(gridPattern);

test('renders correctly', () => {
  const tree = renderer
    .create(<Grid gridModel={gridModel}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});