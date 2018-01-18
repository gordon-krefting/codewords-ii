import React from 'react'
import _ from 'lodash'

import {FixedCell, WhiteCell, BlackCell} from './GridModel.js';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    var firstCell = this.props.gridModel.getFirstSelectableCell();
    var direction = "across";

    this.state = {
      currentSelection: firstCell,
      currentDirection: direction,
      currentWord:      this.props.gridModel.getWord(firstCell, direction),
    }
  }

	render() {
		var o = [];
		let cells = this.props.gridModel.cells;

		for (let i=0; i<cells.length;i++) {
      var p = [];
      for (let j=0; j<cells[i].length;j++) {
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
              isInCurrentWord={this.state.currentWord.contains(cell)}
              onClick={() => this.handleClick(cell)}
              key={`grd-${i}-${j}`}
            />
      		);
      	} else if (cell instanceof WhiteCell) {
          p.push(
      			<WhiteSquare
              onClick={() => this.handleClick(cell)}
              value={this.props.entryLookup(i,j)}
              isSelected={_.isEqual(cell, this.state.currentSelection)}
              isInCurrentWord={this.state.currentWord.contains(cell)}
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

  componentDidMount() {
    window.addEventListener("keydown", (event) => this.handleKeyDown(event));
    window.addEventListener("keypress", (event) => this.handleKeyPress(event));
  }

  handleKeyPress(event) {
    let key = event.key;
    let cell = this.state.currentSelection;
    let nextCell = cell;

    if (key >= 'a' && key <= 'z') {
      if (this.props.letterEntryHandler(key.toUpperCase(), cell.row, cell.column)) {
        nextCell = this.state.currentWord.nextCell(cell);
      }
    } else if (key >= 'A' && key <= 'Z') {
      if (this.props.letterEntryHandler(key, cell.row, cell.column)) {
        nextCell = this.state.currentWord.nextCell(cell);
      }
    }
    this.setState({
      currentSelection: nextCell,
    });
  }

  handleKeyDown(event) {
    console.log("keydown");
    console.log(event);

    if ("Tab" === event.code) {
      event.preventDefault();
      this.handleTab(event);
    } else if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.code)) {
      event.preventDefault();
      this.handleArrow(event);
    }

  }

  handleTab(event) {
    let newSelection;
    let newWord;
    let newDirection = this.state.currentDirection;

    let firstChoice;  // Next/prev word in the same direction
    let secondChoice; // Switch to the other direcetion

    if (this.state.currentDirection === "across" && event.shiftKey) {
      firstChoice  = this.props.gridModel.getPreviousAcross(this.state.currentSelection);
      secondChoice = this.props.gridModel.getLastDown().firstEditableCell();
    } else if (this.state.currentDirection === "across") {
      firstChoice  = this.props.gridModel.getNextAcross(this.state.currentSelection);
      secondChoice = this.props.gridModel.getFirstDown().firstEditableCell();
    } else if (this.state.currentDirection === "down" && event.shiftKey) {
      firstChoice  = this.props.gridModel.getPreviousDown(this.state.currentSelection);
      secondChoice = this.props.gridModel.getLastAcross().firstEditableCell();
    } else if (this.state.currentDirection === "down") {
      firstChoice  = this.props.gridModel.getNextDown(this.state.currentSelection);
      secondChoice = this.props.gridModel.getFirstAcross().firstEditableCell();
    }

    if (firstChoice !== undefined) {
      newSelection = firstChoice;
      newDirection = this.state.currentDirection;
    } else {
      newSelection = secondChoice;
      newDirection = this.state.currentDirection === "across" ? "down" : "across";
    }
    newWord      = this.props.gridModel.getWord(newSelection, newDirection);

    this.setState({
      currentSelection: newSelection,
      currentWord     : newWord,
      currentDirection: newDirection,
    });
  }

  handleArrow(event) {
    let newSelection = this.state.currentSelection;
    let newWord      = this.state.currentWord;
    let newDirection = this.state.currentDirection;

    if ((this.state.currentDirection === "across" && "ArrowRight" === event.code) ||
        (this.state.currentDirection === "down" && "ArrowDown" === event.code)) {
      newSelection = this.state.currentWord.nextCell(this.state.currentSelection);

    } else if ((this.state.currentDirection === "across" && "ArrowLeft" === event.code) ||
        (this.state.currentDirection === "down" && "ArrowUp" === event.code)) {
      newSelection = this.state.currentWord.previousCell(this.state.currentSelection);

    } else {
      let targetDirection = this.state.currentDirection === "across" ? "down" : "across";
      let targetWord = this.props.gridModel.getWord(this.state.currentSelection, targetDirection);
      if (targetWord !== undefined) {
        let editableCell;
        if (["ArrowRight", "ArrowDown"].includes(event.code)) {
          editableCell = targetWord.nextCell(this.state.currentSelection);
        } else {
          editableCell = targetWord.previousCell(this.state.currentSelection);
        }
        if (editableCell !== undefined && editableCell !== this.state.currentSelection){
          newWord = targetWord;
          newDirection = targetDirection;
        }
      }

    }

    this.setState({
      currentSelection: newSelection,
      currentWord     : newWord,
      currentDirection: newDirection,
    });
  }

  handleClick(cell) {
    if (cell.selectable && this.state.currentSelection === cell) {
      let newDirection = this.state.currentDirection === "down" ? "across" : "down";
      let word = this.props.gridModel.getWord(cell, newDirection);
      if (word !== undefined) {
        this.setState({
          currentSelection: cell,
          currentWord     : word,
          currentDirection: newDirection,
        });
      }
    } else if (cell.selectable) {
      let direction = this.state.currentDirection;
      let word = this.props.gridModel.getWord(cell, direction);
      if (word === undefined) {
        direction = direction === "down" ? "across" : "down";
        word = this.props.gridModel.getWord(cell, direction);
      }

      this.setState({
        currentSelection: cell,
        currentWord     : word,
        currentDirection: direction,
      });
    }
  }

}

class FixedSquare extends React.Component {
	render() {
    let extraClass = this.props.isInCurrentWord ? " selected-word" : "";
		return (
      <div className={"square fixed-square" + extraClass}>
        <div className="label">{this.props.label}</div>
        <div className="value" onClick={this.props.onClick}>{this.props.value}</div>
      </div>
    );
	}
}

class WhiteSquare extends React.Component {
	render() {
    let extraClass =
      this.props.isSelected ? " selected" :
      this.props.isInCurrentWord ? " selected-word" : "";
    return (
      <div className={"square white-square" + extraClass}>
        <div className="label">{this.props.label}</div>
        <div className="value" onClick={this.props.onClick}>{this.props.value}</div>
      </div>
    );
	}
}
