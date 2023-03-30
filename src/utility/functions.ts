import _ from "lodash";
import { actions } from "../store";
import {
    CellClassObjectType,
    TableClassObjectType,
    SheetClassObjectType,
} from "./Classes";

//#region utils
/**
 * deep clones table and cell, performs callback and sets new table with changed cell
 * @param x horizontal (column/cell) cell coords
 * @param y vertical (row) cell coords
 * @param callback function to be used between cloning and setting
 */
export const cloneAndSetTableCell = (
    x: number,
    y: number,
    tableIndex: number,
    dispatch: Function,
    sheet: SheetClassObjectType,
    callback: (cl: CellClassObjectType) => void
) => {
    const _table: TableClassObjectType = _.cloneDeep(sheet.tables[tableIndex]);
    const _cell = _table.cells[y][x];
    callback(_cell);
    _table.cells[y][x] = _cell;
    const _sheet: SheetClassObjectType = _.cloneDeep(sheet);
    _sheet.tables[tableIndex] = _table;
    dispatch(actions.setSheet(_sheet));
};
