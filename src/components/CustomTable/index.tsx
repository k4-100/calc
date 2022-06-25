import React, { useState } from "react";
import _ from "lodash";
import { useTable } from "react-table";
/**
 *
 * @returns Table with cells
 */
const CustomTable = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "Hello2",
        col2: "World2",
      },
      {
        col1: "Hello",
        col2: "World3",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const tableInstance = useTable<any>({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellChange = () =>
    // x:number,
    // y:number,
    // e: any
    {};

  return (
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      {/* Apply the table body props */}

      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows

          rows.map((row) => {
            // Prepare the row for display

            prepareRow(row);

            return (
              // Apply the row props

              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells

                  row.cells.map((cell) => {
                    // Apply the cell props

                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents

                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default CustomTable;

// <div className="CustomTable">
//   <Table striped bordered hover>
//     <thead>
//       <tr>
//       <th>X</th>
//       {
//         table.cells[0]
//         && table.cells[0].map( (_,i) => <th key={i}>{i}</th> )
//       }
//       </tr>
//     </thead>
//     <tbody>
//     {
//       table.cells.map(
//         (_,y) => <tr key={y}>
//           <td>{y}</td>
//           {
//             table.cells[y].map(
//               (data,x) =>
//               <td
//                 key={x}
//                 contentEditable
//                 onChange={ (e)=>  handleCellChange(x,y,e) }
//               >
//               </td>
//             )
//           }
//         </tr>
//       )
//     }
//     </tbody>
//   </Table>
// </div>
