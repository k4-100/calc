import React from "react";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import { CellClass, TableClass, SheetClass } from "../../../utility/Classes";
import { evaluate } from "mathjs";
import { useGlobalContext } from "../../../context";
/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {
  const { sheet, setSheet } = useGlobalContext();
  /** index of a table inside of the sheet */
  const tableIndex = sheet.tables.findIndex(
    (tab) => tab.id === sheet.mainTabID
  );
  //#region utils
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
    const _table: TableClass = _.cloneDeep(sheet.tables[tableIndex]);
    const _cell = _table.cells[y][x];
    callback(_cell);
    _table.cells[y][x] = _cell;
    const _sheet: SheetClass = _.cloneDeep(sheet);
    _sheet.tables[tableIndex] = _table;
    setSheet!(_sheet);
  };

  /**
   * @param colName name (string) at the top of the column
   * @returns column number
   */
  const getColumnNumberFromColName = (colName: string): number => {
    return colName.charCodeAt(0) - 65;
  };

  /**
   * @param text to evaluate
   * @returns evaulated this.text used for display in a table
   */
  const getEvaluatedText = (text: string) => {
    const table = _.cloneDeep(sheet.tables[tableIndex]);
    // if this.text is a mathematical expression:
    if (text[0] === "=") {
      const regex: RegExp = /([A-Z][1-9]+)/;
      if (regex.test(text)) {
        let _text: string = "";
        const chunks: string[] = text
          .trim()
          .split(regex)
          .filter((str) => str !== "");

        _text = chunks.reduce((prev, next): string => {
          if (regex.test(next)) {
            // split string
            const coords = next.split(/([A-Z])/).filter((str) => str !== "");
            return (prev +=
              table.cells[Number(coords[1]) - 1][
                getColumnNumberFromColName(coords[0])
              ].value || "0");
          } else {
            return (prev += next);
          }
        });
        return evaluate(_text.substring(1));
      } else {
        return evaluate(text.substring(1));
      }
    }
    return text;
  };
  //#endregion utils

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellBlur = (x: number, y: number, e: any) => {
    console.log("lost focus");
    cloneAndSetTableCell(x, y, (cl) => {
      if (cl.clicks === 2) {
        cl.text = e.target.textContent;
        cl.value = getEvaluatedText(e.target.textContent);
      }
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
          cl.value = getEvaluatedText(e.target.textContent);
          cl.clicks = 0;
        }
      });
    }
    // on non-ENTER key press if cell was clicked on once
    else {
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
  const table: TableClass = _.cloneDeep(sheet.tables[tableIndex]);
  return (
    <div className="CustomTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {table.cells[0] &&
              table.cells[0].map((_, i) => (
                <TableCell
                  className="h1"
                  key={i}
                  // style={{ maxWidth: "250px" }}
                >
                  {String.fromCharCode(65 + i)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <tbody>
          {table.cells.map((_, y) => (
            <tr key={y + 1}>
              <td className="h1">{y + 1}</td>
              {table.cells[y].map((data: CellClass, x) => (
                <td
                  className="h1"
                  // style={{
                  //   backgroundColor: data.wasFound ? "red" : "",
                  //   maxWidth: "250px",
                  //   width: "250px",
                  //   overflowX: "auto",
                  // }}
                  key={x}
                  id={`td-${x}-${y}`}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleCellBlur(x, y, e)}
                  onKeyDown={(e) => handleCellKeyDown(x, y, e)}
                  onClick={(e) => handleCellClick(x, y, e)}
                >
                  {data.clicks === 2 ? data.text : data.value}
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
