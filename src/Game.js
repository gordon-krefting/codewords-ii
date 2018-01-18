import React from 'react';
import Grid from './Grid.js';
import {GridModel} from './GridModel.js';

let gridPattern = `
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
.D...A.I.E----M
`;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.gridModel = new GridModel(gridPattern);

    this.entryGrid = this._setupEntryGrid(
      this.gridModel.cells.length,    // num rows
      this.gridModel.cells[0].length  // num cols
    );
  }

  _setupEntryGrid(numRows, numCols) {
    let entryGrid = [];
    for (let row = 0; row < numRows; row++) {
      let rowArr = [];
      for (let col = 0; col < numCols; col++) {
        rowArr.push(" ");
      }
      entryGrid.push(rowArr);
    }
    return entryGrid;
  }

  render() {
    return (
      <Grid
        gridModel={this.gridModel}
        entryLookup={this.entryLookup.bind(this)}
        letterEntryHandler={this.letterEntryHandler.bind(this)}
      />
    );
  }

  // this name is ick
  letterEntryHandler(letter, row, column) {
    //console.log(`Letter: ${letter} entered into (${row}, ${column})`);
    this.entryGrid[row][column] = letter;
    // So.... this is lame. I'm pretty sure I don't understand state tracking!
    // Or perhaps react isn't so good when your data structure is a 2d array.
    // Anyway, this triggers a (possibly inefficient) re-render of everything
    this.setState({
    });
    return true;
  }

  entryLookup(row, column) {
    return this.entryGrid[row][column];
  }

}
