// !
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../../store"
import { TableClass,  SheetClassObjectType, TableClassObjectType, CellClassObjectType, CellClass } from "../../../utility/Classes";
import CustomTableCell from "./CustomTableCell";
import CustomInfoCell from "./CustomInfoCell";




/**
 * size of td cell with a number (the one used for indexing)
 */
// const numberTdSize = 100;

/**
 *
 * @returns Table with cells
 */
const CustomTable: React.FC = () => {

  const sheet =  useSelector( (state: any)=> state );
  const dispatch =  useDispatch();

  // /** index of a table inside of the sheet */
  const tableIndex = sheet.tables.findIndex(
    (tab: any) => tab.id === sheet.mainTabID
  );



  
  //#region utils
  /**
   * deep clones table and cell, performs callback and sets new table with changed cell
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param callback function to be used between cloning and setting
   */
  const cloneAndSetTableCell =  useCallback((_x: number, _y: number, callback: (cl: CellClassObjectType) => void, cll: CellClassObjectType ) => {
      // const _table: TableClassObjectType = _.cloneDeep(sheet.tables[tableIndex]);
      const _cell = _.cloneDeep(cll);
      callback(_cell);
      // _table.cells[y][x] = _cell;
      // const _sheet: SheetClassObjectType = _.cloneDeep(sheet);
      // _sheet.tables[tableIndex] = _table;
      dispatch( actions.setCell(_cell) );
      
  },[dispatch]);

  //#endregion utils




  // useEffect( ()=>{
  //   const _cell = new CellClass(0,0, "textt").getObject();
  //   dispatch( actions.setCell(_cell) );
  // },[dispatch])



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
  



  const cells = table.cells.map((_, y) => (
        <TableRow key={y + 1}>
          {/* {  */}
          {/*   <TableCell */}
          {/*     sx={{ */}
          {/*       backgroundColor: `${grey[900]} !important`, */}
          {/*       fontSize: "20px", */}
          {/*       textAlign: "center", */}
          {/*       width: "70px", */}
          {/*     }} */}
          {/*   > */}
          {/*     {y + 1} */}
          {/*   </TableCell> */}
          {/* } */}
          <CustomInfoCell content={ (y+1).toString() } />

          {table.cells[y].map((cell: CellClassObjectType, x) => (
            <CustomTableCell
              x={x}
              y={y}
              cell={cell}
              cloneAndSetTableCell={cloneAndSetTableCell}
              // getEvaluatedText={getEvaluatedText}
              key={`td-${x}-${y}`}
            />
          ))}
        </TableRow>
  ));

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
