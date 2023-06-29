import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store";
import {
    TableClassObjectType,
    CellClassObjectType,
    ProfileVariantEnum,
    SheetClassObjectType,
    TableClass,
} from "../../../utility/Classes";
import { CustomInfoCellMemoized } from "./CustomInfoCell";
import CustomTableRow from "./CustomTableRow";
import { useParams } from "react-router-dom";

/**
 *
 * @returns Table with editable cells, which are in turn saved to local storage using redux
 */
const CustomTable: React.FC = () => {
    const { mode, calc, calcRemote } = useSelector((state: any) => state);
    const index = Number(useParams().index) - 1;
    const [loading, setLoading] = useState(true);

    console.log("calcRemote: ", calcRemote);

    const sheet: SheetClassObjectType =
        mode === ProfileVariantEnum.Local ? calc[index] : calcRemote.sheet;

    const dispatch = useDispatch();

    /** index of a table inside of the sheet */
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
    const cloneAndSetTableCell = useCallback(
        (
            _x: number,
            _y: number,
            callback: (cl: CellClassObjectType) => void,
            cll: CellClassObjectType
        ) => {
            const _cell = _.cloneDeep(cll);
            callback(_cell);
            // const _table: TableClassObjectType = _.cloneDeep(sheet.tables[tableIndex]);
            // _table.cells[y][x] = _cell;
            // const _sheet: SheetClassObjectType = _.cloneDeep(sheet);
            // _sheet.tables[tableIndex] = _table;
            if (mode === ProfileVariantEnum.Local) {
                dispatch(actions.setCell({ cell: _cell, sheetID: index + 1 }));
            } else if (mode === ProfileVariantEnum.Local) {
                actions.setCellRemote({ cell: _cell });
            }
        },
        [dispatch, index, mode]
    );

    //#endregion utils

    const numberInfoCellContentFunction = useCallback(
        (a: number) => (a + 1).toString(),
        []
    );

    /** memoized current table */
    const table: TableClassObjectType = useMemo(
        () => sheet.tables[tableIndex],
        [sheet.tables, tableIndex]
    );

    /** memoized letters at top of a table */
    const listTable = useMemo(() => {
        return table.cells[0].map((_, i) => (
            <CustomInfoCellMemoized
                key={i}
                content={String.fromCharCode(65 + i)}
                width={170}
            />
        ));
    }, [table.cells]);

    /** all the cell in form of jsx array */
    const cells = table.cells.map((_, y) => (
        <CustomTableRow
            key={y + 1}
            y={y}
            rowArr={table.cells[y]}
            cloneAndSetTableCell={cloneAndSetTableCell}
            cellWidth={70}
            contentFunction={numberInfoCellContentFunction}
        />
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
