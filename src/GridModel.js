/* */
//import Coords from './Coords.js';

export class GridModel {
  
  constructor(gridPattern) {
    this.gridPattern = gridPattern;
    this.cells = [];

    var rowIndex = 0;
    for (let rowPattern of gridPattern.trim().split("\n")) {
      let row = [];
      this.cells.push(row);
      var colIndex = 0;
      for (let cellPattern of rowPattern.trim()) {
        if (cellPattern === '-') {
          row.push(new BlackCell(rowIndex, colIndex));
        } else if (cellPattern === '.') {
          row.push(new WhiteCell(rowIndex, colIndex));
        } else if ("A" <= cellPattern && cellPattern <= "Z") {
          row.push(new FixedCell(rowIndex, colIndex, cellPattern));
        } else {
          throw new Error("Unknown grid symbol:" + cellPattern);
        }
        colIndex++;
      }
      rowIndex++;
    }
  }

  getFirstSelectableCell() {
    var found = this.cells[0].find(e => e.selectable);
    if (found === undefined) {
      throw new Error("Badly formed puzzle: first row doesn't have any selectable cells:" + this.gridPattern);  
    }
    return found;
    //for (let i = 0; i < this.cells[0].length; i++) {
     // if (this.cells[0][i].selectable) return this.cells[0][i];
    //}
    
  }

  getNextAcrossWord(cell) {

  }

  getPreviousAcrossWord(cell) {

  }

  getNextDownWord(cell) {
    
  }

  getPreviousDownWord(cell) {
    
  }

}


/*
 * Base class for cells.
 */
class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

export class WhiteCell extends Cell {
  selectable = true;
  clickable  = true;

  constructor(row, column, label = '', shaded=false) {
    super(row, column);
    this.label = label;
    this.shaded = shaded;
  }
}

export class BlackCell extends Cell {
  selectable = false;
  clickable  = false;
}

export class FixedCell extends Cell {
  clickable  = true;
  selectable = false;

  constructor(row, column, value, label = '', shaded=false) {
    super(row, column);
    this.value = value;
    this.label = label;
    this.shaded = shaded;
  }
}

/* just an array of cells with some helpers */
/* hmm */
class Word {
  cells = [];
  // Only useful for testing
  init(wordPattern) {
    for (let cellPattern of wordPattern.trim()) {
      if (cellPattern === '-') {
        this.cells.push(new BlackCell());
      } else if (cellPattern === '.') {
        this.cells.push(new WhiteCell());
      } else if ("A" <= cellPattern && cellPattern <= "Z") {
        this.cells.push(new FixedCell(cellPattern));
      } else {
        throw new Error("Unknown grid symbol:" + cellPattern);
      }
    }
  }

  getNextCell(cell) {

  }
  getPreviousCell(cell) {

  }
}




