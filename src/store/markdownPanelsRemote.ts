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
        },
    },
});

export default markdownPanelsRemoteSlice;
