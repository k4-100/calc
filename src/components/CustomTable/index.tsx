import React, { useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { TableClass } from "../../utility/TableClass";

/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {
  const [table, setTable] = useState<TableClass>(new TableClass(4, 3));

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellBlur = (x: number, y: number, e: any) => {
    console.log('lost focus')
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
   * @param e event object
   */
  const handleCellKeyDown = (x: number, y: number, e: any) => {
    const { keyCode } = e;
    // if keyCode is Enter
    if(keyCode ===  13){
      e.preventDefault();
      const _table = _.cloneDeep(table);
      const _cell = _.cloneDeep(_table.cells[y][x]);
      _cell.text = e.target.textContent;
      _cell.clicks = 2;
      _table.cells[y][x] = _cell;
      setTable(_table);
    }
  }


  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellClick = (x: number, y: number, e: any) => {
      const _table = _.cloneDeep(table);
      const _cell = _.cloneDeep(_table.cells[y][x]);
      if( _cell.clicks < 2)
        _cell.clicks = ++_cell.clicks;

      _table.cells[y][x] = _cell;
      setTable(_table);
  }


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
                  id={`td-${x}-${y}`}
                  contentEditable
                  onBlur={e => handleCellBlur(x, y, e)}
                  onKeyDown={ e => handleCellKeyDown(x,y,e) }
                  onClick={ e => handleCellClick(x,y,e) }
                >
                  { data.clicks < 2 ? data.text : data.content}
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
