import React from 'react'
import { Table } from 'react-bootstrap'
/**
 * 
 * @returns Table with cells 
 */
const CustomTable: React.FC = () =>{

    const table: Array<Array<String> > = Array(9).fill( Array(9).fill('*') )
    return(
        <div className="Table">
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>0</th>
              {
                table.map( (_,i) => <th key={i}>{i}</th> )
              }
              </tr>
            </thead>
            <tbody>
            {
              table.map( 
                (_,x) => <tr key={x}>
                  <td>{x}</td>
                  {
                    table[x].map( 
                      (data,y) => <td key={y}>
                        {data}
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