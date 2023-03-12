import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./components/Sheet";
import Home from "./components/Home";
// import { writeStorage, useLocalStorage } from '@rehooks/local-storage';

// import { useSelector, useDispatch } from "react-redux"
// import { actions } from "./store"



const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


// const darkTheme = createTheme({
//   palette: {
//     mode: "dark"
//   },
//   typography: {
//     fontFamily: 'agave',
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @font-face {
//           font-family: 'agave';
//           font-style: normal;
//           font-display: swap;
//           font-weight: 400;
//           src: url(${mainWebsiteFont});
//           unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
//         }
//       `,
//     },
//   },
// })





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
