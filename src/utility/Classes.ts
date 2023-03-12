/**
 * id for the cell
 */
let cellIDSrc: number = 0;


/**
 * represents Cell inside a table in form of a pure object
 */
export type CellClassObjectType = {
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
}


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
  
  getObject(): CellClassObjectType {
    return({
      x: this.x,
      y: this.y,
      text: this.text,
      clicks: this.clicks,
      value: this.value,
      id: this.id,
      wasFound: this.wasFound
    })
  }

}



/**
 * class representing a table filled with cells in a forn of a pure object
 */
export type TableClassObject = {
  /** 2d array storing cells representing table */
  cells: Array<Array<CellClassObjectType>>;
  /** table id */
  id: string;
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

  getObject(): TableClassObject{
    return({
      cells: 
        this.cells.map( 
          row => row.map(  cell => cell.getObject()  ) 
        )
      ,
      id: this.id
    })
  }
}


export type SheetClassObjectType = {
  /** all tables in the sheet */
  tables: Array<TableClassObject>;
  /** sheet id */
  id: string;
  /** id of main tab */
  mainTabID: string;
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


  getObject(): SheetClassObjectType{
    return({
      tables: this.tables.map( table => table.getObject() ),
      id: this.id,
      mainTabID: this.id
    })
  }

}
