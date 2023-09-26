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
    (): Array<MarkdownPanelObjectType> => {
        const markdownPanelsRaw: null | string =
            localStorage.getItem("markdownPanels");
        if (!markdownPanelsRaw) {
            const newMarkdownPanelArr: Array<MarkdownPanelSheetObjectType> = [
                new MarkdownPanelSheet().getObject(),
                new MarkdownPanelSheet().getObject(),
                new MarkdownPanelSheet().getObject(),
                // new MarkdownPanel().getObject(),
                // new MarkdownPanel().getObject(),
                // new MarkdownPanel().getObject(),
            ];

            newMarkdownPanelArr[0].content = markdownPlacehoder;

            localStorage.setItem(
                "markdownPanels",
                JSON.stringify(newMarkdownPanelArr)
            );
            return newMarkdownPanelArr;
        }

        return JSON.parse(markdownPanelsRaw) as Array<MarkdownPanelObjectType>;
    };

const markdownPanelsSlice = createSlice({
    name: "markdownPanels",
    initialState: determineInitialStateMarkdownPanels(),
    reducers: {
        setContentForPanel(
            state,
            action: {
                payload: { panelID: number; content: string };
                type: string;
            }
        ) {
            const newState = _.cloneDeep(state);

            const { panelID, content } = action.payload;
            console.log(action.payload);
            const panelIndex: number = newState.findIndex(
                (panel: MarkdownPanelObjectType) => panel.id === panelID
            );

            if (panelIndex < 0) {
                console.error("ERROR: MARKDOWN PANEL DOESN'T EXIST");
                return;
            }

            newState[panelIndex].content = content;

            console.log(newState);

            localStorage.setItem("markdownPanels", JSON.stringify(newState));
            return newState;
        },
    },
});

export default markdownPanelsSlice;
