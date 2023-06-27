import { createSlice } from "@reduxjs/toolkit";
import { ProfileVariantEnum } from "../utility/Classes";

const modeSlice = createSlice({
    name: "mode",
    initialState: ProfileVariantEnum.Local,
    reducers: {
        setMode(
            _state: ProfileVariantEnum,
            action: {
                payload: ProfileVariantEnum;
                type: string;
            }
        ) {
            return action.payload;
        },
    },
});

export default modeSlice;
