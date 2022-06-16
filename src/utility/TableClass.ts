/**
 * represents Cell inside a table
 */
class Cell{
    x: number;
    y: number;
    text: string;
    id: number;

    constructor(x:number, y:number, text:string){
        this.x = x;
        this.y = y;
        this.text = text;
        this.id = 0;
    }
}

export class TableClass{
    cells: Array< Array<Cell> >;

    constructor(width:number, height:number){
        /**
         *  dummy cells 2d array for generating stuff
         */
        const _cells: Array< Array<null> > = Array(width).fill(
            Array(height).fill(null)
        );

        this.cells = _cells
        .map( ( row, x ) => row
            .map( ( _, y ) => new Cell(x,y,'|=|') )
        );
    }
}