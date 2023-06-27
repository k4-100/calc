import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profileNumber",
    initialState: { index: 1 } as { index: number },
    reducers: {
        setProfile(state, action: { payload: number; type: string }) {
            const { payload } = action;
            if (payload < 1 || payload > 3) {
                console.error(`ERROR: payload: ${payload} out of bound`);
                return state;
            }

            state.index = payload;
        },
    },
});

export default profileSlice;
