/* */
import Coords from './Coords.js';

export class GridModel {
  
  constructor(gridPattern) {
    this.gridPattern = gridPattern;
    this.cells = [];

    for (let rowPattern of gridPattern.trim().split("\n")) {
      let row = [];
      this.cells.push(row);
      for (let cellPattern of rowPattern.trim()) {
        if (cellPattern === '-') {
          row.push(new BlackCell());
        } else if (cellPattern === '.') {
          row.push(new WhiteCell());
        } else if ("A" <= cellPattern && cellPattern <= "Z") {
          row.push(new FixedCell(cellPattern));
        } else {
          throw new Error("Unknown grid symbol:" + cellPattern);
        }
      }
    }
  }

  getCell(coords) {
    return this.cells[coords.row][coords.column];
  }

  getFirstSelectableCell() {
    for (let i = 0; i < this.cells[0].length; i++) {
      if (this.cells[0][i].selectable) return new Coords(0,i);
    }
    throw new Error("First row doesn't have any selectable cells:" + this.gridPattern);
  }

}


/*
 * Base class for cells
 */
class Cell {

}

export class WhiteCell extends Cell {
  selectable = true;
  clickable  = true;

  constructor(label = '', shaded=false) {
    super();
    this.label = label;
    this.shaded = shaded;
  }
  toString() {
    return "-";
  }
}

export class BlackCell extends Cell {
  selectable = false;
  clickable  = false;
  toString() {
    return "X";
  }
}

export class FixedCell extends Cell {
  clickable  = true;
  selectable = false;

  constructor(value, label = '', shaded=false) {
    super();
    this.value = value;
    this.label = label;
    this.shaded = shaded;
  }

  toString() {
    return this.value;
  }
}