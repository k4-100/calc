import React, { useState, useCallback } from "react";
import _ from "lodash";
import { TableCell } from "@mui/material";
import { CellClass } from "../../../utility/Classes";
type Props = {
  x: number;
  y: number;
  cell: CellClass;
  cloneAndSetTableCell: Function;
  getEvaluatedText: Function;
};

const CustomTableCell: React.FC<Props> = ({
  x,
  y,
  cell,
  cloneAndSetTableCell,
  getEvaluatedText,
}) => {
  const [text, setText] = useState<string>("");
  const [clicks, setClicks] = useState<number>(0);

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellClick = (x: number, y: number, e: any) => {
    if (clicks < 2) setClicks(clicks + 1);
  };

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellKeyDown = useCallback(
    (x: number, y: number, e: any) => {
      const { keyCode } = e;
      // if keyCode is Enter save content
      if (keyCode === 13) {
        e.preventDefault();

        cloneAndSetTableCell(x, y, (cl: CellClass) => {
          const _cell = _.cloneDeep(cl);
          if (clicks === 2) {
            cell.text = e.target.textContent;
            cell.value = getEvaluatedText(e.target.textContent);
            setClicks(0);
          }
        });
      }
      // on non-ENTER key press if cell was clicked on once
      else {
        if (clicks < 2) setClicks(2);
      }
    },
    [cloneAndSetTableCell, getEvaluatedText]
  );

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellBlur = (x: number, y: number, e: any) => {
    console.log("lost focus");
    cloneAndSetTableCell(x, y, (cl: CellClass) => {
      const _cell = _.cloneDeep(cl);
      if (clicks === 2) {
        _cell.text = e.target.textContent;
        _cell.value = getEvaluatedText(e.target.textContent);
      }
      setClicks(0);
    });
  };

  return (
    <TableCell
      key={x}
      id={`td-${x}-${y}`}
      contentEditable
      suppressContentEditableWarning
      // onBlur={(e) => handleCellBlur(x, y, e)}
      // onKeyDown={(e) => handleCellKeyDown(x, y, e)}
      // onClick={(e) => handleCellClick(x, y, e)}
      sx={{
        // position: data.clicks === 0 ? "" : "absolute",
        backgroundColor: cell.wasFound ? "red" : `grey !important`,
        fontSize: "18px",
        width: "170px",
        // width: `calc(  (100vw - ${numberTdSize}px) / ${table.cells.length - 1} )`,
        // minWidth:
        //   data.clicks === 0
        //     ? ""
        //     : `calc( (100vw - ${numberTdSize}px) / ${
        //         table.cells.length - 1
        //       } ) !important`,
        // maxWidth: `calc( (100vw - ${numberTdSize}px) / ${
        //   table.cells.length - 1
        // } )`,
        overflowX: cell.clicks === 0 ? "hidden" : "scrollbar",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {cell.clicks === 2 ? text : cell.value}
    </TableCell>
  );
};

export default CustomTableCell;
