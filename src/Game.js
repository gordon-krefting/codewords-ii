import React from 'react';
import Grid from './Grid.js';
import {GridModel} from './GridModel.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log("Constructing...");
  }
  render() {
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
    let gridModel = new GridModel(gridPattern);
    return (
      <Grid gridModel={gridModel}/>
    );
  }
}
