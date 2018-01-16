/* */

export class GridModel {
	
	constructor(gridPattern) {

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

}


export class WhiteCell {
	constructor(label = '', shaded=false) {
		this.label = label;
		this.shaded = shaded;
	}
  toString() {
		return "-";
	}
}

export class BlackCell {
  toString() {
		return "X";
	}
}

export class FixedCell {
	constructor(value, label = '', shaded=false) {
		this.value = value;
		this.label = label;
		this.shaded = shaded;
	}
  toString() {
		return this.value;
	}
}