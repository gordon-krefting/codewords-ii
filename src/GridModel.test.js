import {GridModel, WhiteCell} from './GridModel.js';

let simpleGridPattern = `
  -...-
  ...B-
  .A.C.
  -....
  -...-
`;

test('parsing a good grid', () => {
  let gridModel = new GridModel(simpleGridPattern);
  //console.log(gridModel.acrossWords.map(word => word.toString()).join('\n'));
  //console.log(gridModel.downWords.map(word => word.toString()).join('\n'));
});

test('parsing a bad grid', () => {
  expect(() => {
    new GridModel(`!`);
  }).toThrow();
});

// TODO only pick a valid across
test('getting the first selectable cell should work on a good grid', () => {
  let gridModel = new GridModel(simpleGridPattern);
  expect(gridModel.getFirstSelectableCell()).toEqual(new WhiteCell(0,1));
});

test('getting the first selectable cell should not work on a bad grid', () => {
  let gridModel = new GridModel(`-----`);
  expect(() => {
    gridModel.getFirstSelectableCell();
  }).toThrow();
});

let navTestGridPattern =`
.O.O.H.NE---S-S
A-A-O-B-CA.O.S.
.O.N.L.TH-A-N-R
I-L-K-E-IM.T.T.
.U.M.R--D-L-T-N
U-A-T---NE.N...
....-.O.A-U--O-
-L-.O.-H-ATTEND
S.A.-.R.S.--P-A
-R-E-E-S-..R.T.
.........-I-S-D
E-E-E-M-A-.C.U.
.A.D.-.E.A.-D-E
I-O-R-E-E-.N.M.
.D.E.A.I.E----M
`;

test('parsing a complex grid', () => {
  let gridModel = new GridModel(navTestGridPattern);
  //console.log(gridModel.acrossWords.map(word => word.toString()).join('\n'));
  //console.log(gridModel.downWords.map(word => word.toString()).join('\n'));
});
