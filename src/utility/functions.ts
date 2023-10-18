import _ from "lodash";
import { actions } from "../store";
import {
    CellClassObjectType,
    TableClassObjectType,
    SheetClassObjectType,
    SheetClassObjectTypeWithChecksum,
    MarkdownPanelSheetObjectType,
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
        // checksum: queryParsed.uncompressed_content_checksum,
        checksums: queryParsed.uncompressed_content_checksum,
    };
    console.log(newState);
    return newState;
};

/**
 *  fetches the initial value of a calcRemote state, same as the state in db
 */
export const fetchInitialStateMarkdownRemote = async (
    accesstoken: string
): Promise<MarkdownPanelSheetObjectType> => {
    const queryParsed: any = await fetch(
        `${ROUTES.ROOT}/${ROUTES.MARKDOWN}/load`,
        {
            method: "POST",
            // credentials: "include", // Needed to include the cookie
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
            },
        }
    )
        .then(async (data) => {
            const d_parsed = await data.json();
            return d_parsed;
        })
        .catch((err) =>
            console.log("error while loading markdownSheet: ", err)
        );
    console.log(queryParsed);
    const newState: MarkdownPanelSheetObjectType = {
        id: Number(queryParsed.data[0].markdown_sheets_id),
        panels: (queryParsed.data as Array<any>).map((panel) => {
            const parsedPanel = panel;
            parsedPanel.id = Number(panel.markdown_panels_id);
            parsedPanel.content = parsedPanel.compressed_content;
            delete parsedPanel.compressed_content;
            // debugger;
            return parsedPanel;
        }),
        mainPanelID: Number(queryParsed.data[0].markdown_panels_id),
    };
    console.log(newState);
    return newState;
};
