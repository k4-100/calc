import { configureStore, createSlice } from "@reduxjs/toolkit"
import _ from "lodash";
import { SheetClass, SheetClassObjectType } from '../utility/Classes'


const newSheet: SheetClassObjectType = new SheetClass().getObject();


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








// import { createStore } from 'redux';

// const reducerFn = (state={ counter: 0 }, action: any) =>{
//   // LIMITATIONS:
//   // Syncronous Function
//   // We should not mutate the original state
//   
//   switch (action.type){
//     case "INC":
//       return { counter: state.counter + 1 }
//     case "DEC":
//       return { counter: state.counter - 1 }
//     case "ADD_BY":
//       return { counter: state.counter + action.payload}
//   }
//   

//   return state;
// }

// const store = createStore(reducerFn)
// export default store
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useSelector, useDispatch } from "react-redux"

// function App() {
//   const counter = useSelector( (state: any)=> state.counter )
//   const dispatch = useDispatch();

//   const increment = () =>{
//     dispatch({type: "INC"})
//   }

//   const decrement = () =>{
//     dispatch({type: "DEC"})
//   }

//   const addBy = ( ammount: number ) =>{
//     dispatch({type:"ADD_BY", payload: ammount})
//   }

//   return (
//     <div className="App">
//       <h1> 
//         {counter}
//       </h1>
//         <button onClick={increment}> Increment </button>
//         <button onClick={decrement}> Decrement </button>
//         <button onClick={()=> addBy(15)}> Add Ammount </button>
//     </div>
//   )
// }

// export default App
