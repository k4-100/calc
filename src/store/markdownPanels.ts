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

            // if (sheetIndex < 0) {
            //     console.error(
            //         "ERROR: SHEET ISN'T PART OF THE STATE IN setSheet"
            //     );
            //     return;
            // }

            newState[sheetIndex] = _.cloneDeep(action.payload);
            localStorage.setItem("markdownPanels", JSON.stringify(newState));

            return newState;
        },
    },
});

export default markdownPanelsSlice;
