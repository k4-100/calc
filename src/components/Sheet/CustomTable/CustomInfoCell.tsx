import React, { memo, useMemo } from "react";
import _ from "lodash";
import { TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
    content: string;
    width: number;
};

const CustomInfoCell: React.FC<Props> = ({ content, width }) => {
    const widthCSS = useMemo(() => `${width}px`, [width]);
    return (
        <TableCell
            sx={{
                backgroundColor: `${grey[900]} !important`,
                fontSize: "20px",
                textAlign: "center",
                width: widthCSS,
            }}
        >
            {content}
        </TableCell>
    );
};

export default CustomInfoCell;

// const arePropsEqual = ( oldProps: Props, newProps: Props ) => {
//   const sample = {
//     content: _.isEqual(oldProps.content, newProps.content),
//     width: _.isEqual(oldProps.width, newProps.width),
//   };

//   console.table( sample );
//
//   return _.isEqual( oldProps, newProps);

// }

export const CustomInfoCellMemoized = memo(CustomInfoCell);
