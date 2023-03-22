import _ from "lodash";
import { evaluate } from "mathjs";
import { useSelector, useDispatch } from "react-redux";
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

/**
 * @param colName name (string) at the top of the column
 * @returns column number
 */
const getColumnNumberFromColName = (colName: string): number => {
    return colName.charCodeAt(0) - 65;
};

/**
 * @param text to evaluate
 * @returns evaulated this.text used for display in a table
 */
export const getEvaluatedText = (
    text: string,
    tableIndex: number,
    sheet: SheetClassObjectType
) => {
    const table = _.cloneDeep(sheet.tables[tableIndex]);
    // if this.text is a mathematical expression:
    if (text[0] === "=") {
        const regex: RegExp = /([A-Z][1-9]+)/;
        if (regex.test(text)) {
            let _text: string = "";
            const chunks: string[] = text
                .trim()
                .split(regex)
                .filter((str) => str !== "");

            _text = chunks.reduce((prev, next): string => {
                if (regex.test(next)) {
                    // split string
                    const coords = next
                        .split(/([A-Z])/)
                        .filter((str) => str !== "");
                    return (prev +=
                        table.cells[Number(coords[1]) - 1][
                            getColumnNumberFromColName(coords[0])
                        ].value || "0");
                } else {
                    return (prev += next);
                }
            });
            return evaluate(_text.substring(1));
        } else {
            return evaluate(text.substring(1));
        }
    }
    return text;
};
//#endregion utils
