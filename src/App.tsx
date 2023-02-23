import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./components/Sheet";
import Home from "./components/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
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
