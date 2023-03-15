// !
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
// import { evaluate } from "mathjs";
import { useSelector, useDispatch } from "react-redux"
// import { actions } from "../../../store"
import { TableClass,  SheetClassObjectType, TableClassObjectType, CellClassObjectType } from "../../../utility/Classes";
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


  const sheet =  useSelector( (state: any)=> state )
  const dispatch =  useDispatch();
  // const setSheet = 
  // dispatch( actions.setSheet() )

  console.log("re-rendered CustomTable");
  // /** index of a table inside of the sheet */
  const tableIndex = sheet.tables.findIndex(
    (tab: any) => tab.id === sheet.mainTabID
  );
  

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

  const cells = useMemo(
    () =>
      table.cells.map((_, y) => (
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
          {table.cells[y].map((cell: CellClassObjectType, x) => (
            <CustomTableCell
              x={x}
              y={y}
              cell={cell}
              // cloneAndSetTableCell={cloneAndSetTableCell}
              // getEvaluatedText={getEvaluatedText}
              key={`td-${x}-${y}`}
            />
          ))}
        </TableRow>
      )),
    [ table.cells]
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
          {table.cells[0] && listTable}
        </TableRow>
      </TableHead>
      <TableBody>{cells}</TableBody>
    </Table>
  );
};

export default CustomTable;
