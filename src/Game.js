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
      -...-
      ....-
      ..A..
      -....
      -...-`;
		let gridModel = new GridModel(gridPattern);
    return (
      <Grid gridModel={gridModel}/>
    );
  }
}
