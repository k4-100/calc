import { Box, ListItem, Typography } from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { ProfileVariantEnum } from "../../utility/Classes";
import { fetchInitialStateCalcRemote } from "../../utility/functions";
import UtilityBelt from "../common/UtilityBelt";
import SearchBar from "../common/UtilityBelt/SearchBar";
import SheetBar from "./SheetBar";

/** lazy loaded */
const SuspensendedCustomTable = React.lazy(() => import("./CustomTable"));
/**
 *
 * @returns Sheet component with editable columns, ability to search for text, calculate values in single and several rows, as well as ability to add more Tables
 */
const Sheet: React.FC = () => {
    const { mode, calcRemote, token } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCalcRemote = async () => {
            const res = await fetchInitialStateCalcRemote(token.accesstoken);
            dispatch(actions.setSheetRemote(res));
        };
        if (calcRemote.id !== 0) {
            console.log("run");
        }
        fetchCalcRemote();
    }, [dispatch, token.accesstoken, calcRemote.id]);
    // debugger;
    return (
        <>
            <UtilityBelt
                helpChildren={
                    <>
                        <ListItem>
                            To change text, click twice on a cell and start
                            typing, and save by clicking Enter/clicking
                            somewhere else.
                        </ListItem>
                        <ListItem>
                            To perform calculation, begin by typing `=`, for
                            example: =10-5
                        </ListItem>
                        <ListItem>
                            You can access cell for use in mathematical
                            expression by its "name" (for example: A1, B3, C2),
                            by typing `=` before it (like: =A2, =B3).
                        </ListItem>
                        <ListItem>
                            To change current profile/sheet, press the number in
                            header and switch to another one.
                        </ListItem>
                        <ListItem
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            You can use functions operating on numbers in cells:
                            <Typography>
                                Sum(x:y) {"<"}- sums up numbers in x:y range
                                (for example: Sum(A1:B2) )
                            </Typography>
                            <Typography>
                                Avg(x:y) {"<"}- returns an average of numbers in
                                x:y range (for example: Avg(E4:H10) )
                            </Typography>
                        </ListItem>
                    </>
                }
            >
                <SearchBar />
            </UtilityBelt>
            <Box
                sx={{
                    overflow: "scroll",
                    // firefox
                    scrollbarColor: "rgb(144, 202, 249)",
                    // scrollbarColor: "green",
                    // webkit (chrome, edge, opera, safari but not on ios)
                    "&::-webkit-scrollbar": {
                        border: "2px solid blue",
                        width: "10px",
                        height: "10px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background: "#90CAF9A6",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#90BAF9",
                    },
                    height: "calc( 100vh - 53px - 64px - 20px )",
                }}
            >
                <Suspense fallback={<h1>Loading Table...</h1>}>
                    {mode === ProfileVariantEnum.Online &&
                    calcRemote.id === 0 ? (
                        <>...fetching</>
                    ) : (
                        <>
                            <SuspensendedCustomTable />
                        </>
                    )}
                </Suspense>
            </Box>
            <SheetBar />
        </>
    );
};

export default Sheet;
