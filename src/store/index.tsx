import { configureStore, createSlice } from "@reduxjs/toolkit"
import _ from "lodash";
import { evaluate } from "mathjs";
import { CellClassObjectType, SheetClass, SheetClassObjectType } from '../utility/Classes';


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





  /**
   * @param colName name (string) at the top of the column
   * @returns column number
   */
  const getColumnNumberFromColName = (colName: string): number => {
    return colName.charCodeAt(0) - 65;
  }


  /**
   * @param text to evaluate
   * @returns evaulated this.text used for display in a table
   */
const getEvaluatedText = (state: SheetClassObjectType, tableIndex: number, text: string ) => {
    const sheet = _.cloneDeep(state);
    const table = _.cloneDeep(sheet.tables[tableIndex]);
    // if this.text is a mathematical expression:
    if (text[0] === "=") {
      const regex: RegExp = /([A-Z][1-9]+)/;
      if (regex.test(text)) {
        let _text: string = "";
        const chunks: string[] = text
          .trim()
          .split(regex)
          .filter((str) => str !== "");

        _text = chunks.reduce((prev, next): string => {
          if (regex.test(next)) {
            // split string
            const coords = next.split(/([A-Z])/).filter((str) => str !== "");
            return (prev +=
              table.cells[Number(coords[1]) - 1][
                getColumnNumberFromColName(coords[0])
              ].value || "0");
          } else {
            return (prev += next);
          }
        });
        return evaluate(_text.substring(1));
      } else {
        return evaluate(text.substring(1));
      }
    }
    return text;
  }




const calcSlice = createSlice({
  name: 'calc',
  initialState: determineInitialState(),
  reducers: {
    setSheet(state, action){
      localStorage.setItem('sheet', JSON.stringify(action.payload) );
      return action.payload
    },
    setCell(state: SheetClassObjectType, action: { payload: CellClassObjectType,  type: string } ){
      const newState = _.cloneDeep(state);
      const tableIndex = state.tables.findIndex(
        (tab: any) => tab.id === state.mainTabID
      );

      const { payload } = action;
      payload.value = getEvaluatedText(state, tableIndex, payload.text);
      newState.tables[tableIndex].cells[payload.y][payload.x] = _.cloneDeep(action.payload);
      localStorage.setItem('sheet', JSON.stringify(newState) );
      return newState;
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
