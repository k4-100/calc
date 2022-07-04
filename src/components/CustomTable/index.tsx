import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { CellClass, TableClass } from "../../utility/TableClass";

/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {
  const [table, setTable] = useState<TableClass>(new TableClass(4, 3));

  // useEffect(() => {
  //   debugger;
  // }, [table]);
  /**
   * deep clones table and cell, performs callback and sets new table with changed cell
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param callback function to be used between cloning and setting
   */
  const cloneAndSetTableCell = (
    x: number,
    y: number,
    callback: (cl: CellClass) => void
  ) => {
    // debugger;
    const _table: TableClass = _.cloneDeep(table);
    // const _cell : CellClass = { ..._table.cells[y][x] };
    const _cell = _table.cells[y][x];
    // debugger;
    // debugger;
    callback(_cell);
    _table.cells[y][x] = _cell;
    setTable(_table);
    // debugger;
  };

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellBlur = (x: number, y: number, e: any) => {
    console.log("lost focus");
    cloneAndSetTableCell(x, y, (cl) => {
      if (cl.clicks === 2) cl.text = e.target.textContent;
      cl.clicks = 0;
    });
  };

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellKeyDown = (x: number, y: number, e: any) => {
    const { keyCode } = e;
    // if keyCode is Enter save content
    if (keyCode === 13) {
      e.preventDefault();

      cloneAndSetTableCell(x, y, (cl) => {
        if (cl.clicks === 2) {
          cl.text = e.target.textContent;
          cl.clicks = 0;
        }
      });
      // _cell.clicks = 2;
    } else {
      cloneAndSetTableCell(x, y, (cl) => {
        if (cl.clicks < 2) cl.clicks = 2;
      });
    }
  };

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellClick = (x: number, y: number, e: any) => {
    cloneAndSetTableCell(x, y, (cl) => {
      if (cl.clicks < 2) cl.clicks = ++cl.clicks;
    });
  };

  return (
    <div className="CustomTable">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>X</th>
            {table.cells[0] &&
              table.cells[0].map((_, i) => <th key={i}>{i}</th>)}
          </tr>
        </thead>
        <tbody>
          {table.cells.map((_, y) => (
            <tr key={y}>
              <td>{y}</td>
              {table.cells[y].map((data: CellClass, x) => (
                <td
                  key={x}
                  id={`td-${x}-${y}`}
                  contentEditable
                  onBlur={(e) => handleCellBlur(x, y, e)}
                  onKeyDown={(e) => handleCellKeyDown(x, y, e)}
                  onClick={(e) => handleCellClick(x, y, e)}
                >
                  {data.clicks === 2 ? data.text : data.getEvaluatedText()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
