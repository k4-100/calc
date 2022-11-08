/**
 * id for the cell
 */
let cellIDSrc: number = 0;

/**
 * represents Cell inside a table
 */
export class CellClass {
  /** x position of the cell in a table */
  x: number;
  /** y position of the cell in a table */
  y: number;
  /** text content of the cell */
  text: string;
  /** evaluated value of the cell text */
  value: string;
  /**  number of times cell has been clicked*/
  clicks: number;
  /** unique id number */
  id: number;
  /** indicate if the cell has been found */
  wasFound: boolean;

  /**
   *
   * @param x x position of the cell in a table
   * @param y y position of the cell in a table
   * @param text text and content of the cell
   */
  constructor(x: number, y: number, text: string) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.value = "";
    this.clicks = 0;
    this.wasFound = false;
    this.id = ++cellIDSrc;
  }

  getAsPureObject() {
    return {
      x: this.x,
      y: this.y,
      text: this.text,
      value: this.value,
      clicks: this.clicks,
      wasFound: this.wasFound,
      id: this.id,
    };
  }
}

/**
 * class representing a table filled with cells
 */
export class TableClass {
  /** 2d array storing cells representing table */
  cells: Array<Array<CellClass>>;
  /** table id */
  id: string;
  /**
   *
   * @param width horizontal width of an array
   * @param height vertical hight of an array
   * @param id table id
   */
  constructor(width: number, height: number, id: string) {
    /**
     *  dummy cells 2d array for generating stuff
     */
    const _cells: Array<Array<null>> = Array(width).fill(
      Array(height).fill(null)
    );

    this.cells = _cells.map((row, y) =>
      row.map((_, x) => new CellClass(x, y, ""))
    );

    this.id = id;
  }

  convertToJSON() {
    return JSON.stringify({
      id: this.id,
      data: this.cells.map((row) => row.map((item) => item.getAsPureObject())),
    });
  }
}

export class SheetClass {
  /** all tables in the sheet */
  tables: Array<TableClass>;
  /** sheet id */
  id: string;
  /** id of main tab */
  mainTabID: string;

  /**
   * constructs sheet with default table and an id
   */
  constructor() {
    this.tables = [new TableClass(26, 26, "first")];
    this.id = "first";
    this.mainTabID = "first";
  }
}
