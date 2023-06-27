import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

type TokenSliceType = {
    id: string;
    username: string;
    accesstoken: string;
};

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        id: "",
        username: "",
        accesstoken: "",
    } as TokenSliceType,
    reducers: {
        setAccessToken(
            _state,
            action: {
                payload: TokenSliceType;
                type: string;
            }
        ) {
            return action.payload;
        },

        setAccessTokenOnly(
            state: TokenSliceType,
            action: {
                payload: string;
                type: string;
            }
        ) {
            const newState = _.cloneDeep(state);
            newState.accesstoken = action.payload;
            return newState;
        },
    },
});

export default tokenSlice;
