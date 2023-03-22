import React, { memo } from "react";
import { TableRow } from "@mui/material";
import _ from "lodash";
import CustomInfoCell from "./CustomInfoCell";
import CustomTableCell from "./CustomTableCell";
import { CellClassObjectType } from "../../../utility/Classes";

type Props = {
    y: number;
    rowArr: Array<CellClassObjectType>;
    cloneAndSetTableCell: Function;
    cellWidth: number;
    contentFunction: Function;
};

function arePropsEqual(oldProps: Props, newProps: Props) {
    return _.isEqual(oldProps, newProps);
}

const CustomTableRow: React.FC<Props> = memo(
    ({ y, rowArr, cloneAndSetTableCell, cellWidth, contentFunction }) => {
        return (
            <TableRow key={y + 1}>
                <CustomInfoCell
                    content={contentFunction(y)}
                    width={cellWidth}
                />
                {rowArr.map((cell: CellClassObjectType, x) => (
                    <CustomTableCell
                        cell={cell}
                        cloneAndSetTableCell={cloneAndSetTableCell}
                        key={`td-${x}-${y}`}
                    />
                ))}
            </TableRow>
        );
    },
    arePropsEqual
);

export default CustomTableRow;
