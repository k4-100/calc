import { Box } from "@mui/material";
import React, { Suspense } from "react";
import SheetBar from "./SheetBar";
// import CustomTable from "./CustomTable";
import UtilityBelt from "./UtilityBelt";

const SuspensendedCustomTable = React.lazy(() => import("./CustomTable"));
/**
 *
 * @returns Sheet component
 */
const Sheet: React.FC = () => {
    return (
        <>
            <UtilityBelt />
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
                    <SuspensendedCustomTable />
                </Suspense>
            </Box>
            <SheetBar />
        </>
    );
};

export default Sheet;
