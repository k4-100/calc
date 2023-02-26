import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./components/Sheet";
import Home from "./components/Home";
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';

// import { useSelector, useDispatch } from "react-redux"
// import { actions } from "./store"



const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let count = 10;
const App: React.FC = () => {
  // const localStorageTest = useLocalStorage('test')
  // const counter = useSelector( (state: any)=> state.counter )
  // const dispatch = useDispatch();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="calc" element={<Sheet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
