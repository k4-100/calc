import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./components/Sheet";
import Home from "./components/Home";
// import { writeStorage, useLocalStorage } from '@rehooks/local-storage';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App: React.FC = () => {
    // const localStorageTest = useLocalStorage('test')

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
