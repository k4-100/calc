import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const tdRef = useRef<any>(null);

  const placeCaretAtEnd = (el: any) => {
    // el.focus();
    // if (
    //   typeof window.getSelection != "undefined" &&
    //   typeof document.createRange != "undefined"
    // ) {
    // if()
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel: any = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    // }
    // else if (typeof (<any>document.body).createTextRange != "undefined")      {
    // var textRange = document.createTextRange();
    //   textRange.moveToElementText(el);
    //   textRange.collapse(false);
    //   textRange.select();
    // }
  };

  useEffect(() => {
    // if (tdRef !== null) {
    const { current } = tdRef as any;
    const handleDOMSubtreeModified = () => {
      const { textContent } = tdRef.current;
      // tdRef.current.selectionStart = textContent.length;
      placeCaretAtEnd(tdRef.current);
      setText(textContent);
      console.log("textModified", textContent);
    };
    current.addEventListener("DOMSubtreeModified", handleDOMSubtreeModified);
    return () =>
      current.removeEventListener(
        "DOMSubtreeModified",
        handleDOMSubtreeModified
      );
    // }
  }, []);
  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellClick = (x: number, y: number, e: any) => {
    if (clicks < 2) setClicks(clicks + 1);
  };

  // useEffect(() => {
  //   const cellDOM: any = document.querySelector(`#td-${x}-${y}`);
  //   if (cellDOM && text !== cellDOM.textContent) {
  //     setTimeout(() => setText(() => cellDOM.textContent), 1);
  //   }
  // }, [text]);
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

        // cloneAndSetTableCell(x, y, (cl: CellClass) => {
        if (clicks === 2) {
          setText(e.target.textContent);
          // value = getEvaluatedText(e.target.textContent);
          setClicks(0);
        }
        // });
      } else {
        // on non-ENTER key press if cell was clicked on once
        if (clicks < 2) {
          setClicks(2);
        }
        // console.log(e);
        const { textContent } = tdRef.current as any;
        const cellDOM: any = document.querySelector(`#${e.target.id}`);
        setText(() => cellDOM.textContent);
      }

      // console.log(e.target.textContent);
      // console.log(e.target);
      // console.log(e);
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
      ref={tdRef}
      id={`td-${x}-${y}`}
      contentEditable
      suppressContentEditableWarning
      // onBlur={(e) => handleCellBlur(x, y, e)}
      onKeyDown={(e) => handleCellKeyDown(x, y, e)}
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
      {text}
      {/* {clicks === 2 ? text : cell.value} */}
    </TableCell>
  );
};

export default CustomTableCell;
