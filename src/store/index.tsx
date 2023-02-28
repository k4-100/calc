import { configureStore, createSlice, createReducer } from "@reduxjs/toolkit"
import produce, { current } from 'immer'
import _ from "lodash";
import { SheetClass, CellClass, TableClass } from '../utility/Classes'


// const cl = new CellClass(1,2,"text");
// console.log( cl )
// console.log( cl.getObject() )
// const tb = new TableClass(5,3, "213")
// console.log( tb )
// console.log( tb.getObject() )
// const sh = new SheetClass()
// console.log( sh )
// console.log( sh.getObject() )


const calcSlice = createSlice({
  name: 'calc',
  initialState: new SheetClass().getObject(),
  reducers: {
    setSheet(state, action){
      // console.log( "state: ", current( state ))
      // console.log( "action.payload: ", action.payload )
      // const newSheets = _.cloneDeep( state )
      // newSheets.id = '3214124'
      return action.payload
      // newSheets.id = "sar"
      // return action.payload
      // return {
      //   ...state,
      //   sheets: {
      //     ...state.sheets,
      //     // ssa: new SheetClass().getObject
      //     tables: state.sheets.tables.map( table => {
      //       return ({
      //         ...table,
      //         cells: table.cells.map( 
      //           row => row.map( cell => ({...cell}) ) 
      //         )
      //       })
      //     } )
      //   }
      //   
      // }

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



// const todosReducer = createReducer([], (builder) => {
//   builder.addCase('todos/todoAdded', (state, action) => {
//     // "mutate" the array by calling push()
//     state.push(action.payload)
//   })
// })


export const actions = calcSlice.actions;

const store = configureStore({
  reducer: calcSlice.reducer
})

export default store
