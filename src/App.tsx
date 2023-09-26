import React, { useEffect } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./components/Sheet";
import Home from "./components/Home";
import TextEditor from "./components/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store";
import jwtDecode from "jwt-decode";
import { ROUTES } from "./utility/constants";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App: React.FC = () => {
    const { token } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    // First thing, check if a refreshtoken exist
    useEffect(() => {
        async function checkRefreshToken() {
            if (!token.accesstoken) {
                return;
            }
            const decoded = jwtDecode(token.accesstoken);
            // checks if gonna be expired in 15 seconds
            const isExpired = Date.now() >= ((decoded as any).exp - 5) * 1000;
            if (isExpired) {
                // console.log("expired");
                const result = await fetch(
                    `${ROUTES.ROOT}/${ROUTES.CALC}/refresh_token`,
                    {
                        method: "POST",
                        // credentials: "include", // Needed to include the cookie
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((data) => data.json())
                    .catch((err) =>
                        console.log("error while fetching data: ", err)
                    );
                // console.log("res: ", result);
                const { accesstoken } = result;
                dispatch(actions.setAccessTokenOnly(accesstoken));
            }
        }

        const id = setInterval(() => checkRefreshToken(), 5000);
        return () => clearInterval(id);
    }, [dispatch, token.accesstoken]);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="calc/:index" element={<Sheet />} />
                        <Route path="text/:index" element={<TextEditor />} />
                        <Route path="*" element={<Home isError />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
