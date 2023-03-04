import { configureStore, createSlice, createReducer } from "@reduxjs/toolkit"
import produce, { current } from 'immer'
import _ from "lodash";
import { SheetClass, CellClass, TableClass, SheetClassObjectType } from '../utility/Classes'


const newSheet: SheetClassObjectType = new SheetClass().getObject();
// localStorage.setItem('sheet', JSON.stringify(newSheet) );


const determineInitialState = (): SheetClassObjectType => {
  const sheetRaw: null | string = localStorage.getItem('sheet');
  if( !sheetRaw ){
    const newSheet: SheetClassObjectType = new SheetClass().getObject();
    localStorage.setItem('sheet', JSON.stringify(newSheet) );

    return newSheet;
  }
  
  return JSON.parse(sheetRaw) as SheetClassObjectType;
}

const calcSlice = createSlice({
  name: 'calc',
  initialState: determineInitialState(),
  reducers: {
    setSheet(state, action){
      
      localStorage.setItem('sheet', JSON.stringify(action.payload) );
      return action.payload

    }
  }
})


export const actions = calcSlice.actions;

const store = configureStore({
  reducer: calcSlice.reducer
})

export default store
