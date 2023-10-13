import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
    MarkdownPanelSheet,
    MarkdownPanelSheetObjectType,
} from "../utility/Classes";

const markdownPanelsRemoteSlice = createSlice({
    name: "markdownPanels",
    initialState: new MarkdownPanelSheet().getObject(),
    reducers: {
        setMarkdownSheetRemote(
            _state: MarkdownPanelSheetObjectType,
            action: {
                payload: MarkdownPanelSheetObjectType;
                type: string;
            }
        ) {
            return action.payload;
            // const newState = _.cloneDeep(state);
            // const sheetIndex: number = newState.findIndex(
            //     (sht: MarkdownPanelSheetObjectType) =>
            //         sht.id === action.payload.id
            // );
            // if (sheetIndex < 0) {
            //     console.error(
            //         "ERROR: MARKDOWN SHEET ISN'T PART OF THE STATE IN setMarkdownSheet"
            //     );
            //     return;
            // }
            // // if (sheetIndex < 0) {
            // //     console.error(
            // //         "ERROR: SHEET ISN'T PART OF THE STATE IN setSheet"
            // //     );
            // //     return;
            // // }
            // newState[sheetIndex] = _.cloneDeep(action.payload);
            // localStorage.setItem("markdownPanels", JSON.stringify(newState));
            // return newState;
        },
    },
});

export default markdownPanelsRemoteSlice;
