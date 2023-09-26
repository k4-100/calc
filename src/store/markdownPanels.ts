import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
    MarkdownPanel,
    MarkdownPanelObjectType,
    MarkdownPanelSheet,
    MarkdownPanelSheetObjectType,
} from "../utility/Classes";

/**
 *  determines the initial value of a markdownPanels state which can be either:
 *  - new array of MarkdownPanelObjectType
 *  - array saved in local storage
 */
const determineInitialStateMarkdownPanels =
    (): Array<MarkdownPanelSheetObjectType> => {
        const markdownPanelsRaw: null | string =
            localStorage.getItem("markdownPanels");
        if (!markdownPanelsRaw) {
            const newMarkdownPanelArr: Array<MarkdownPanelSheetObjectType> = [
                new MarkdownPanelSheet().getObject(),
                new MarkdownPanelSheet().getObject(),
                new MarkdownPanelSheet().getObject(),
            ];

            localStorage.setItem(
                "markdownPanels",
                JSON.stringify(newMarkdownPanelArr)
            );
            return newMarkdownPanelArr;
        }

        return JSON.parse(
            markdownPanelsRaw
        ) as Array<MarkdownPanelSheetObjectType>;
    };

const markdownPanelsSlice = createSlice({
    name: "markdownPanels",
    initialState: determineInitialStateMarkdownPanels(),
    reducers: {
        // setCell(
        //     state: Array<SheetClassObjectType>,
        //     action: {
        //         payload: { cell: CellClassObjectType; sheetID: number };
        //         type: string;
        //     }
        // ) {
        //     const newState = _.cloneDeep(state);
        //     const sheetIndex: number = newState.findIndex(
        //         (sht: SheetClassObjectType) => sht.id === action.payload.sheetID
        //     );

        //     if (sheetIndex < 0) {
        //         console.error("ERROR: SHEET DOESN'T EXIST");
        //         return;
        //     }

        //     const tableIndex = newState[sheetIndex].tables.findIndex(
        //         (tab: any) => tab.id === newState[sheetIndex].mainTabID
        //     );

        //     if (tableIndex < 0) {
        //         console.error("ERROR: TABLE DOESN'T EXIST");
        //         return;
        //     }

        //     const { payload } = action;
        //     payload.cell.value = getEvaluatedText(
        //         newState[sheetIndex],
        //         tableIndex,
        //         payload.cell.text
        //     );
        //     newState[sheetIndex].tables[tableIndex].cells[payload.cell.y][
        //         payload.cell.x
        //     ] = _.cloneDeep(action.payload.cell);
        //     localStorage.setItem("sheets", JSON.stringify(newState));
        //     return newState;
        // },

        // setContentForPanel(
        //     state,
        //     action: {
        //         payload: { panelID: number; content: string };
        //         type: string;
        //     }
        // ) {
        //     const newState = _.cloneDeep(state);

        //     const { panelID, content } = action.payload;
        //     console.log(action.payload);
        //     const panelIndex: number = newState.findIndex(
        //         (panel: MarkdownPanelObjectType) => panel.id === panelID
        //     );

        //     if (panelIndex < 0) {
        //         console.error("ERROR: MARKDOWN PANEL DOESN'T EXIST");
        //         return;
        //     }

        //     newState[panelIndex].content = content;

        //     console.log(newState);

        //     localStorage.setItem("markdownPanels", JSON.stringify(newState));
        //     return newState;
        // },

        setMarkdownSheet(
            state,
            action: {
                payload: MarkdownPanelSheetObjectType;
                type: string;
            }
        ) {
            const newState = _.cloneDeep(state);

            const sheetIndex: number = newState.findIndex(
                (sht: MarkdownPanelSheetObjectType) =>
                    sht.id === action.payload.id
            );

            if (sheetIndex < 0) {
                console.error(
                    "ERROR: SHEET ISN'T PART OF THE STATE IN setMarkdownSheet"
                );
                return;
            }

            if (sheetIndex < 0) {
                console.error(
                    "ERROR: SHEET ISN'T PART OF THE STATE IN setSheet"
                );
                return;
            }
            newState[sheetIndex] = _.cloneDeep(action.payload);
            localStorage.setItem("markdownPanels", JSON.stringify(newState));

            return newState;
        },
    },
});

export default markdownPanelsSlice;
