import _ from "lodash";
import { actions } from "../store";
import {
    CellClassObjectType,
    TableClassObjectType,
    SheetClassObjectType,
    SheetClassObjectTypeWithChecksum,
} from "./Classes";
import { ROUTES } from "./constants";

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
 *  fetches the initial value of a calcRemote state, which is equivalent to the actual state in db
 */
export const fetchInitialStateCalcRemote = async (
    accesstoken: string
): Promise<SheetClassObjectTypeWithChecksum> => {
    const queryParsed: any = await fetch(`${ROUTES.ROOT}/${ROUTES.CALC}/load`, {
        method: "POST",
        // credentials: "include", // Needed to include the cookie
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
        },
    })
        .then((data) => data.json())
        .catch((err) => console.log("error while loading sheet: ", err));

    console.log("dsafas");

    const newState: SheetClassObjectTypeWithChecksum = {
        sheet: {
            id: Number(queryParsed.data[0].calc_sheets_id),
            tables: (queryParsed.data as Array<any>).map((table) => {
                const parsedTable = JSON.parse(table.compressed_content);
                parsedTable.id = Number(table.calc_tables_id);
                return parsedTable;
            }),
            mainTabID: Number(queryParsed.data[0].calc_tables_id),
        },
        checksum: queryParsed.uncompressed_content_checksum,
    };
    console.log(newState);
    return newState;
};
