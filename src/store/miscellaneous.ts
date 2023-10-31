import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { MiscellaneousType } from "../utility/Classes";

const miscellaneousSlice = createSlice({
    name: "miscellaneous",
    initialState: {
        pickedMode: false,
        loadedRemoteMarkdown: false,
    } as MiscellaneousType,
    reducers: {
        setPickedMode(
            _state: MiscellaneousType,
            action: {
                payload: boolean;
                type: string;
            }
        ) {
            const newState = _.cloneDeep(_state);
            newState.pickedMode = action.payload;
            return newState;
        },
        setLoadedRemoteMarkdown(
            _state: MiscellaneousType,
            action: {
                payload: boolean;
                type: string;
            }
        ) {
            const newState = _.cloneDeep(_state);
            newState.loadedRemoteMarkdown = action.payload;
            return newState;
        },
    },
});

export default miscellaneousSlice;
