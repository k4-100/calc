import { configureStore, createSlice } from "@reduxjs/toolkit"
import { SheetClass, CellClass, TableClass } from '../utility/Classes'


const cl = new CellClass(1,2,"text");
console.log( cl.getObject() )
const tb = new TableClass(5,3, "213")
console.log( tb )
console.log( tb.getObject() )
const sh = new SheetClass()
console.log( sh )
console.log( sh.getObject() )


const calcSlice = createSlice({
  name: 'calc',
  initialState: { sheets:  new SheetClass().getObject() },
  reducers: {
    setSheet(state, action){
      // debugger;
      state.sheets = action.payload
      // debugger;
    }
    // increment(state) {
    //   state.counter++
    // },
    // decrement(state) {
    //   state.counter--
    // },
    // addBy    (state, action) {
    //   state.counter += action.payload
    // },
  }
})

export const actions = calcSlice.actions;

const store = configureStore({
  reducer: calcSlice.reducer
})

export default store
