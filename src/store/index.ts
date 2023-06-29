import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calcSlice from "./calc";
import calcRemoteSlice from "./calcRemote";
import markdownPanelsSlice from "./markdownPanels";
import modeSlice from "./mode";
import profileSlice from "./profile";
import tokenSlice from "./token";

export const actions = {
    ...calcSlice.actions,
    ...profileSlice.actions,
    ...markdownPanelsSlice.actions,
    ...modeSlice.actions,
    ...tokenSlice.actions,
    ...calcRemoteSlice.actions,
};

const reducer = combineReducers({
    calc: calcSlice.reducer,
    profile: profileSlice.reducer,
    markdownPanels: markdownPanelsSlice.reducer,
    mode: modeSlice.reducer,
    token: tokenSlice.reducer,
    calcRemote: calcRemoteSlice.reducer,
});

const store = configureStore({ reducer });

export default store;
// export default createStore(reducer);
