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
}

/**
 * class representing a table filled with cells
 */
export class TableClass {
  /** 2d array storing cells representing table */
  cells: Array<Array<CellClass>>;

  /**
   *
   * @param width horizontal width of an array
   * @param height vertical hight of an array
   */
  constructor(width: number, height: number) {
    /**
     *  dummy cells 2d array for generating stuff
     */
    const _cells: Array<Array<null>> = Array(width).fill(
      Array(height).fill(null)
    );

    this.cells = _cells.map((row, y) =>
      row.map((_, x) => new CellClass(x, y, ""))
    );
  }
}
