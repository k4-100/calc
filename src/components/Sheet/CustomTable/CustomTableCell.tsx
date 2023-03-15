// !
import React, { useState, useCallback, useEffect, useRef, memo, useMemo } from "react";
import { TableCell } from "@mui/material";
import _ from 'lodash';
import { useSelector, useDispatch } from "react-redux";
import { CellClassObjectType } from "../../../utility/Classes";
import { actions } from '../../../store';
import { cloneAndSetTableCell, getEvaluatedText } from "../../../utility/functions";

type Props = {
  x: number;
  y: number;
  cell: CellClassObjectType;
  // cloneAndSetTableCell: Function;
  // getEvaluatedText: Function;
};


function arePropsEqual(oldProps: Props, newProps: Props){
  const  sample = {
    x: _.isEqual(oldProps.x, newProps.x),
    y: _.isEqual(oldProps.y, newProps.y),
    cell: _.isEqual(oldProps.cell, newProps.cell),
    // cloneAndSetTableCell: _.isEqual(oldProps.cloneAndSetTableCell, newProps.cloneAndSetTableCell),
    // getEvaluatedText: _.isEqual(oldProps.getEvaluatedText, newProps.getEvaluatedText),
  };

  const areEqual = _.isEqual(oldProps, newProps);
  console.log("areEqual: ", areEqual);
  return areEqual;
}



const CustomTableCell: React.FC<Props> = memo(({
  x,
  y,
  cell,
  // cloneAndSetTableCell,
  // getEvaluatedText,
}) => {
  // const [text, setText] = useState<string>("");
  const [clicks, setClicks] = useState<number>(0);
  const [wasCaretSet, setWasCaretSet] = useState<boolean>(false);
  const tdRef = useRef<any>(null);


  const sheet = useSelector( (state: any)=> state );
  const dispatch = useDispatch();

  /** index of table inside of a sheet */
  const tableIndex =  sheet.tables.findIndex(
    (tab: any) => tab.id === sheet.mainTabID
  );

  useEffect(() => {
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

    if (clicks === 2 && !wasCaretSet) {
      placeCaretAtEnd(tdRef.current);
      setWasCaretSet(true);
    }
  }, [clicks, wasCaretSet, setWasCaretSet]);

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
  const handleCellKeyDown = (x: number, y: number, e: any) => {
      const { keyCode } = e;
      // if keyCode is Enter save content
      if (keyCode === 13) {
        e.preventDefault();

        const { textContent } = tdRef.current;

        if (clicks === 2) {
          if (textContent !== cell.text)
            cloneAndSetTableCell(x, y,tableIndex, dispatch, sheet,(cl: CellClassObjectType) => {
              if (textContent !== cell.text) {
                cl.text = textContent;
                cl.value = getEvaluatedText(textContent, tableIndex, sheet);
              }
            });
          setClicks(0);
        } else if (clicks === 1) setClicks(2);
      } else if (clicks !== 2) setClicks(2);
      // if (clicks === 2 && !wasCaretSet) {
      //   placeCaretAtEnd(tdRef.current);
      //   setWasCaretSet(true);
      // }
      // setClicks(2);
      // else {
      //   if (clicks === 1) {
      //     setClicks(2);
      //   }
      // }
    }

  /**
   *
   * @param x horizontal (column/cell) cell coords
   * @param y vertical (row) cell coords
   * @param e event object
   */
  const handleCellBlur = (x: number, y: number, e: any) => {
    console.log("lost focus");

    const { textContent } = tdRef.current;
    if (textContent !== cell.text) {
      cloneAndSetTableCell(x, y, tableIndex, dispatch, sheet, (cl: CellClassObjectType) => {
        if (clicks === 2) {
          cl.text = textContent;
          cl.value = getEvaluatedText(textContent, tableIndex, sheet);
        }
      });
    }
    setClicks(0);
    setWasCaretSet(false);
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
        overflowX: clicks === 0 ? "hidden" : "scrollbar",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {clicks === 2 ? cell.text : cell.value}
    </TableCell>
  );
}, arePropsEqual);

export default CustomTableCell;
