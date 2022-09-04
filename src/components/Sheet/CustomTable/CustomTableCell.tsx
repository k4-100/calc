import React from "react";
import { TableCell } from "@mui/material";
type Props = {
  x: number;
  y: number;
  data: any;
  handleCellBlur: Function;
  handleCellKeyDown: Function;
  handleCellClick: Function;
};

const CustomTableCell: React.FC<Props> = ({
  x,
  y,
  data,
  handleCellBlur,
  handleCellKeyDown,
  handleCellClick,
}) => {
  return (
    <TableCell
      key={x}
      id={`td-${x}-${y}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => handleCellBlur(x, y, e)}
      onKeyDown={(e) => handleCellKeyDown(x, y, e)}
      onClick={(e) => handleCellClick(x, y, e)}
      sx={{
        position: data.clicks === 0 ? "" : "absolute",
        backgroundColor: data.wasFound ? "red" : `grey !important`,
        fontSize: "18px",
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
        overflowX: data.clicks === 0 ? "hidden" : "auto",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {data.clicks === 2 ? data.text : data.value}
    </TableCell>
  );
};

export default CustomTableCell;
