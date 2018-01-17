import React from 'react';

import {FixedCell, WhiteCell, BlackCell} from './GridModel.js';
import Coords from './Coords.js'

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.currentSelection = this.props.gridModel.getFirstSelectableCell();
  }

	render() {
		var o = [];
		let cells = this.props.gridModel.cells;

		for (let i=0; i<cells.length;i++) {
      var p = [];
      for (let j=0; j<cells[i].length;j++) {
        let coords = new Coords(i,j);
      	let cell = cells[i][j];
      	if (cell instanceof BlackCell) {
      		p.push(
	          <div 
              className="square black-square"
              onClick={() => this.handleClick(coords)}
              key={`grd-${i}-${j}`}
            />
					);
      	} else if (cell instanceof FixedCell) {
      		p.push(
      			<FixedSquare
              value={cell.value}
              onClick={() => this.handleClick(coords)}
              key={`grd-${i}-${j}`}
            />
      		);
      	} else if (cell instanceof WhiteCell) {
      		p.push(
      			<WhiteSquare
              onClick={() => this.handleClick(coords)}
              key={`grd-${i}-${j}`}
            />
      		);
      	}
      }
      o.push(<div className="row" key={"grd"+i}>{p}</div>);
    }
		return (<div className="grid">{o}</div>);
	}

  handleClick(coords) {
    alert(this.props.gridModel.getCell(coords).selectable);
  }

}

class FixedSquare extends React.Component {
	render() {
		return (
      <div className="square fixed-square">
        <div className="label">{this.props.label}</div>
        <div className="value" onClick={this.props.onClick}>{this.props.value}</div>
      </div>
    );
	}
}

class WhiteSquare extends React.Component {
	render() {
		return (
      <div className="square white-square">
        <div className="label">{this.props.label}</div>
        <div className="value" onClick={this.props.onClick}></div>
      </div>
    );
	}
}
