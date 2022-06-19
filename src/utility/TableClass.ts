
/**
 * represents Cell inside a table
 */
class Cell{
    /** x position of the cell in a table */
    x: number;
    /** y position of the cell in a table */
    y: number;
    /** text content of the cell */
    text: string;
    /** unique id number */
    id: number;

    /**
     * 
     * @param x x position of the cell in a table 
     * @param y y position of the cell in a table 
     * @param text text content of the cell
     */
    constructor(x:number, y:number, text:string){
        this.x = x;
        this.y = y;
        this.text = text;
        this.id = 0;
    }
}

/**
 * class representing a table filled with cells
 */
export class TableClass{
    /** 2d array storing cells representing table */
    cells: Array< Array<Cell> >;

    /**
     * 
     * @param width horizontal width of an array
     * @param height vertical hight of an array
     */
    constructor(width:number, height:number){
        /**
         *  dummy cells 2d array for generating stuff
         */
        const _cells: Array< Array<null> > = Array(width).fill(
            Array(height).fill(null)
        );

        this.cells = _cells
        .map( ( row, y ) => row
            .map( ( _, x ) => new Cell(x,y,`${x}-${y}`) )
        );
    }

    
}