import React, { useState} from 'react'
import { Table } from 'react-bootstrap'
import { TableClass } from '../../utility/TableClass'

/**
 * 
 * @returns Table with cells 
 */
const CustomTable: React.FC = () =>{
    const [table, setTable] = useState<TableClass>( 
      new TableClass(4,3)
    );

    const changeTableCell = ( x:Number ,y:Number ) =>{
      alert( `${x}-${y}` )
    }

    return(
        <div className="CustomTable">
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>X</th>
              { 
                table.cells[0]
                && table.cells[0].map( (_,i) => <th key={i}>{i}</th> )
              }
              </tr>
            </thead>
            <tbody>
            {
              table.cells.map( 
                (_,x) => <tr key={x}>
                  <td>{x}</td>
                  {
                    table.cells[x].map( 
                      (data,y) => 
                      <td 
                        key={y} 
                        contentEditable
                        onClick={ ()=>  changeTableCell(x,y) }
                      >
                        {data.text}
                      </td>
                    )
                  }
                </tr>
              )
            }
            </tbody>
          </Table>
        </div>
    )
}

export default CustomTable