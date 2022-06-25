import React, { useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { TableClass, CellClass } from "../../utility/TableClass";

/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {
  const [table, setTable] = useState<TableClass>(new TableClass(4, 3));
  const [currentCell, setCurrentCell] = useState<CellClass | null>(null);
  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellChange = (x: number, y: number, e: any) => {
    alert("wersa");
    const _table = _.cloneDeep(table);
    const _cell = _.cloneDeep(_table.cells[y][x]);
    _cell.text = e.target.textContent;
    _table.cells[y][x] = _cell;
    setTable(_table);
  };

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   */
  const handleCellFocus = (x: number, y: number, e: any) => {
    const target: any = e.target;
    console.log(target);
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
              {table.cells[y].map((data, x) => (
                <td
                  key={x}
                  contentEditable
                  onFocus={(e) => handleCellFocus(x, y, e)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
