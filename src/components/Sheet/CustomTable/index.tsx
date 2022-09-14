import React, { useCallback, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { evaluate } from "mathjs";
import { CellClass, TableClass, SheetClass } from "../../../utility/Classes";
import { useGlobalContext } from "../../../context";
import CustomTableCell from "./CustomTableCell";

/**
 * size of td cell with a number (the one used for indexing)
 */
// const numberTdSize = 100;

/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {
  const { sheet, setSheet } = useGlobalContext();

  console.log("re-rendered CustomTable");
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
  const cloneAndSetTableCell = useCallback(
    (x: number, y: number, callback: (cl: CellClass) => void) => {
      const _table: TableClass = _.cloneDeep(sheet.tables[tableIndex]);
      const _cell = _table.cells[y][x];
      callback(_cell);
      _table.cells[y][x] = _cell;
      const _sheet: SheetClass = _.cloneDeep(sheet);
      _sheet.tables[tableIndex] = _table;
      setSheet!(_sheet);
    },
    [setSheet, sheet, tableIndex]
  );

  /**
   * @param colName name (string) at the top of the column
   * @returns column number
   */
  const getColumnNumberFromColName = useCallback((colName: string): number => {
    return colName.charCodeAt(0) - 65;
  }, []);

  /**
   * @param text to evaluate
   * @returns evaulated this.text used for display in a table
   */
  const getEvaluatedText = useCallback(
    (text: string) => {
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
    },
    [getColumnNumberFromColName, sheet.tables, tableIndex]
  );

  //#endregion utils

  // /**
  //  *
  //  * @param x horizontal (column/cell) cell coords
  //  * @param y vertical (row) cell coords
  //  * @param e event object
  //  */
  // const handleCellBlur = (x: number, y: number, e: any) => {
  //   console.log("lost focus");
  //   cloneAndSetTableCell(x, y, (cl) => {
  //     if (cl.clicks === 2) {
  //       cl.text = e.target.textContent;
  //       cl.value = getEvaluatedText(e.target.textContent);
  //     }
  //     cl.clicks = 0;
  //   });
  // };

  // /**
  //  *
  //  * @param x horizontal (column/cell) cell coords
  //  * @param y vertical (row) cell coords
  //  * @param e event object
  //  */
  // const handleCellKeyDown = useCallback(
  //   (x: number, y: number, e: any) => {
  //     const { keyCode } = e;
  //     // if keyCode is Enter save content
  //     if (keyCode === 13) {
  //       e.preventDefault();

  //       cloneAndSetTableCell(x, y, (cl) => {
  //         if (cl.clicks === 2) {
  //           cl.text = e.target.textContent;
  //           cl.value = getEvaluatedText(e.target.textContent);
  //           cl.clicks = 0;
  //         }
  //       });
  //     }
  //     // on non-ENTER key press if cell was clicked on once
  //     else {
  //       cloneAndSetTableCell(x, y, (cl) => {
  //         if (cl.clicks < 2) cl.clicks = 2;
  //       });
  //     }
  //   },
  //   [cloneAndSetTableCell, getEvaluatedText]
  // );

  // /**
  //  *
  //  * @param x horizontal (column/cell) cell coords
  //  * @param y vertical (row) cell coords
  //  * @param e event object
  //  */
  // const handleCellClick = (x: number, y: number, e: any) => {
  //   cloneAndSetTableCell(x, y, (cl) => {
  //     if (cl.clicks < 2) cl.clicks = ++cl.clicks;
  //   });
  // };

  const table: TableClass = useMemo(
    () => sheet.tables[tableIndex],
    [sheet.tables, tableIndex]
  );

  const listTable = useMemo(
    () =>
      table.cells[0].map((_, i) => (
        <TableCell
          className="h1"
          key={i}
          sx={{
            backgroundColor: `${grey[900]} !important`,
            fontSize: "20px",
            textAlign: "center",

            width: "170px",
          }}
        >
          {String.fromCharCode(65 + i)}
        </TableCell>
      )),
    [table.cells]
  );

  return (
    <Table
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        // overflow
        "& *": {
          display: "block !important",
        },
        "& th, & td": {
          border: "1px solid black",
        },
        "& tr": {
          display: "flex !important",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              backgroundColor: `${grey[900]} !important`,
              width: "70px",
            }}
          />
          {/* {table.cells[0] &&
            table.cells[0].map((_, i) => (
              <TableCell
                className="h1"
                key={i}
                sx={{
                  backgroundColor: `${grey[900]} !important`,
                  fontSize: "20px",
                  textAlign: "center",

                  width: "170px",
                }}
              >
                {String.fromCharCode(65 + i)}
              </TableCell>
            ))} */}
        </TableRow>
      </TableHead>
      <TableBody>
        {table.cells.map((_, y) => (
          <TableRow key={y + 1}>
            <TableCell
              sx={{
                backgroundColor: `${grey[900]} !important`,
                fontSize: "20px",
                textAlign: "center",
                width: "70px",
              }}
            >
              {y + 1}
            </TableCell>
            {table.cells[y].map((cell: CellClass, x) => (
              <CustomTableCell
                x={x}
                y={y}
                cell={cell}
                cloneAndSetTableCell={cloneAndSetTableCell}
                getEvaluatedText={getEvaluatedText}
                key={`td-${x}-${y}`}
                // handleCellBlur={handleCellBlur}
                // handleCellKeyDown={handleCellKeyDown}
                // handleCellClick={handleCellClick}
              />
              // <TableCell
              //   key={x}
              //   id={`td-${x}-${y}`}
              //   contentEditable
              //   suppressContentEditableWarning
              //   onBlur={(e) => handleCellBlur(x, y, e)}
              //   onKeyDown={(e) => handleCellKeyDown(x, y, e)}
              //   onClick={(e) => handleCellClick(x, y, e)}
              //   sx={{
              //     position: data.clicks === 0 ? "" : "absolute",
              //     backgroundColor: data.wasFound
              //       ? red[500]
              //       : `${grey[800]} !important`,
              //     fontSize: "18px",
              //     width: `calc(  (100vw - ${numberTdSize}px) / ${
              //       table.cells.length - 1
              //     } )`,
              //     minWidth:
              //       data.clicks === 0
              //         ? ""
              //         : `calc( (100vw - ${numberTdSize}px) / ${
              //             table.cells.length - 1
              //           } ) !important`,
              //     maxWidth: `calc( (100vw - ${numberTdSize}px) / ${
              //       table.cells.length - 1
              //     } )`,
              //     overflowX: data.clicks === 0 ? "hidden" : "auto",
              //     textOverflow: "ellipsis",
              //     whiteSpace: "nowrap",
              //   }}
              // >
              //   {data.clicks === 2 ? data.text : data.value}
              // </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
