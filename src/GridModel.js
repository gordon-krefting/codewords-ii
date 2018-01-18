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
    this._populateAcrossWords(); // A tab-ordered list of the acrosses
    this._populateAcrossMap();   // A map of cells to the across word they're in
    this._populateDownWords();   // A tab-ordered list of the downs
    this._populateDownMap();     // A map of cells to the down word they're in
  }

  _populateAcrossWords() {
    this.acrossWords = [];
    for (let row=0; row < this.cells.length; row++) {
      var word = new Word();
      for (let col=0; col < this.cells[row].length; col++) {
        //word.cells.push(this.cells[row][col]);
        var thisCell = this.cells[row][col];
        if (thisCell.clickable) {
          word.cells.push(thisCell);
        } else if (word.isValidWord()) {
          this.acrossWords.push(word);
          word = new Word();
        } else {
          word = new Word();
        }
      }
      if (word.isValidWord()) {
        this.acrossWords.push(word);
        word = new Word();
      } else {
        word = new Word();
      }
    }
  }

  _populateAcrossMap() {
    this.acrossMap = new Map();
    this.acrossWords.forEach(word => {
      word.cells.forEach(cell => this.acrossMap.set(cell, word));
    });
  }

  _populateDownWords() {
    this.downWords = [];

    var numCols = this.cells[0].length; // Assume all the rows are the same length. True for now!
    var numRows = this.cells.length;

    for (let col=0; col < numCols; col++) {
      var word = new Word();
      for (let row=0; row < numRows; row++) {
        //word.cells.push(this.cells[row][col]);
        var thisCell = this.cells[row][col];
        if (thisCell.clickable) {
          word.cells.push(thisCell);
        } else if (word.isValidWord()) {
          this.downWords.push(word);
          word = new Word();
        } else {
          word = new Word();
        }
      }
      if (word.isValidWord()) {
        this.downWords.push(word);
        word = new Word();
      } else {
        word = new Word();
      }
    }
  }

  _populateDownMap() {
    this.downMap = new Map();
    this.downWords.forEach(word => {
      word.cells.forEach(cell => this.downMap.set(cell, word));
    });
  }

  getFirstSelectableCell() {
    var found = this.cells[0].find(e => e.selectable);
    if (found === undefined) {
      throw new Error("Badly formed puzzle: first row doesn't have any selectable cells:" + this.gridPattern);  
    }
    return found;
  }

  getWord(cell, direction) {
    if (direction === "across") {
      return this.acrossMap.get(cell);
    } else {
      return this.downMap.get(cell);
    }
  }

  
  getFirstAcross() {
    return this.acrossWords[0];
  }

  getLastAcross() {
    return this.acrossWords.slice(-1)[0];
  }

  /*
   * Returns the first active cell in the next across word, undef if we're at the last
   */
  getNextAcross(cell) {
    let index = this.acrossWords.indexOf(this.getWord(cell, "across"));
    if (index === this.acrossWords.length-1) {
      return undefined;
    } else {
      return this.acrossWords[index+1].firstEditableCell();
    }
  }

  /*
   * Returns the first active cell in the previous across word, undef if we're at the last
   */
  getPreviousAcross(cell) {
    let index = this.acrossWords.indexOf(this.getWord(cell, "across"));
    if (index === 0) {
      return undefined;
    } else {
      return this.acrossWords[index-1].firstEditableCell();
    }
  }

  getFirstDown() {
    return this.downWords[0];
  }

  getLastDown() {
    return this.downWords.slice(-1)[0];
  }

  /*
   * Returns the first active cell in the next down word, undef if we're at the last
   */
  getNextDown(cell) {
    let index = this.downWords.indexOf(this.getWord(cell, "down"));
    if (index === this.downWords.length-1) {
      return undefined;
    } else {
      return this.downWords[index+1].firstEditableCell();
    }
  }

  /*
   * Returns the first active cell in the previous down word, undef if we're at the last
   */
  getPreviousDown(cell) {
    let index = this.downWords.indexOf(this.getWord(cell, "down"));
    if (index === 0) {
      return undefined;
    } else {
      return this.downWords[index-1].firstEditableCell();
    }
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
  toChar() {
    return "_";
  }
}

export class BlackCell extends Cell {
  selectable = false;
  clickable  = false;
  toChar() {
    return "*";
  }
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
  toChar() {
    return this.value;
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

  isValidWord() {
    return this.cells.length > 1 && this.firstEditableCell() !== undefined;
  }

  contains(cell) {
    return this.cells.includes(cell);
  }

  toString() {
    return this.cells.map(cell => cell.toChar()).join('');
  }

  firstEditableCell() {
    let index = 0;
    while (index < this.cells.length-1) {
      if (this.cells[index].selectable) {
        return this.cells[index];
      }
      index++;
    }
    return undefined;
  }

  nextCell(cell) {
    let index = this.cells.indexOf(cell);
    while (index < this.cells.length-1) {
      index++;
      if (this.cells[index].selectable) {
        return this.cells[index];
      }
    }
    return cell;
  }

  previousCell(cell) {
    let index = this.cells.indexOf(cell);
    while (index > 0) {
      index--;
      if (this.cells[index].selectable) {
        return this.cells[index];
      }
    }
    return cell;
  }
}




