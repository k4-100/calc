import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calcSlice from "./calc";
import calcRemoteSlice from "./calcRemote";
import markdownPanelsSlice from "./markdownPanels";
import markdownPanelsRemoteSlice from "./markdownPanelsRemote";
import miscellaneousSlice from "./miscellaneous";
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
    ...markdownPanelsRemoteSlice.actions,
    ...miscellaneousSlice.actions,
};

const reducer = combineReducers({
    calc: calcSlice.reducer,
    profile: profileSlice.reducer,
    markdownPanels: markdownPanelsSlice.reducer,
    mode: modeSlice.reducer,
    token: tokenSlice.reducer,
    calcRemote: calcRemoteSlice.reducer,
    markdownPanelsRemote: markdownPanelsRemoteSlice.reducer,
    miscellaneous: miscellaneousSlice.reducer,
});

const store = configureStore({ reducer });

export default store;
// export default createStore(reducer);
