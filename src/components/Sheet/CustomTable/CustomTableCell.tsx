import React, { useState, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import { TableCell } from "@mui/material";
import { CellClass } from "../../../utility/Classes";
import { ElevatorSharp } from "@mui/icons-material";
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
  // const [text, setText] = useState<string>("");
  const [clicks, setClicks] = useState<number>(0);
  const tdRef = useRef<any>(null);

  /**
   *
   * @param el element to put caret at the end of
   */
  const placeCaretAtEnd = (el: any) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel: any = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

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
          if (clicks === 2) {
            const { textContent } = tdRef.current;
            cl.text = textContent;
            cl.value = getEvaluatedText(textContent);
          } else if (clicks === 1) setClicks(2);
        });
        setClicks(0);
      }

      // setClicks(2);
      // else {
      //   if (clicks === 1) {
      //     setClicks(2);
      //     //   placeCaretAtEnd(tdRef.current);
      //   }
      // }
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
      if (clicks === 2) {
        const { textContent } = tdRef.current;
        console.log("textContent", textContent);
        cl.text = textContent;
        cl.value = getEvaluatedText(textContent);
      }
      setClicks(0);
    });
  };

  return (
    <TableCell
      key={x}
      ref={tdRef}
      id={`td-${x}-${y}`}
      contentEditable
      suppressContentEditableWarning
      onClick={(e) => handleCellClick(x, y, e)}
      onKeyDown={(e) => handleCellKeyDown(x, y, e)}
      onBlur={(e) => handleCellBlur(x, y, e)}
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
      {clicks === 2 ? cell.text : cell.value}
    </TableCell>
  );
};

export default CustomTableCell;
