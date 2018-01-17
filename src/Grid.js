import React from 'react'
import _ from 'lodash'

import {FixedCell, WhiteCell, BlackCell} from './GridModel.js';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    var firstCell = this.props.gridModel.getFirstSelectableCell();

    this.state = {
      currentSelection: firstCell,
      currentDirection: "across",
      //currentWord: this.props.gridModel.getWord(firstCell),
    }
  }

	render() {
		var o = [];
		let cells = this.props.gridModel.cells;

		for (let i=0; i<cells.length;i++) {
      var p = [];
      for (let j=0; j<cells[i].length;j++) {
        //let coords = new Coords(i,j);
      	let cell = cells[i][j];
      	if (cell instanceof BlackCell) {
      		p.push(
	          <div 
              className="square black-square"
              onClick={() => this.handleClick(cell)}
              key={`grd-${i}-${j}`}
            />
					);
      	} else if (cell instanceof FixedCell) {
      		p.push(
      			<FixedSquare
              value={cell.value}
              onClick={() => this.handleClick(cell)}
              key={`grd-${i}-${j}`}
            />
      		);
      	} else if (cell instanceof WhiteCell) {
      		p.push(
      			<WhiteSquare
              onClick={() => this.handleClick(cell)}
              //coords={coords}
              isSelected={_.isEqual(cell, this.state.currentSelection)}
              gridModel={this.props.gridModel}
              key={`grd-${i}-${j}`}
            />
      		);
      	}
      }
      o.push(<div className="row" key={"grd"+i}>{p}</div>);
    }
		return (<div className="grid">{o}</div>);
	}

  handleClick(cell) {
    console.log(cell);
    if (cell.selectable) {
      this.setState({
        currentSelection: cell,
      });
    }
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
    let extraClass = this.props.isSelected ? " selected" : "";
    return (
      <div className={"square white-square" + extraClass}>
        <div className="label">{this.props.label}</div>
        <div className="value" onClick={this.props.onClick}></div>
      </div>
    );
	}
}
