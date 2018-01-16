import {GridModel} from './GridModel.js';

test('parsing a good grid', () => {
	let gridPattern = `
		-...-
		...B-
		.A.C.
		-....
		-...-
	`;
	let gridModel = new GridModel(gridPattern);
});

test('parsing a bad grid', () => {
	expect(() => {
    new GridModel(`!`);
  }).toThrow();
});
