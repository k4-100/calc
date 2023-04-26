import { Paper, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ReactNode } from "react";

type Props = {
    panelName: string;
    children?: ReactNode;
};

const Panel: React.FC<Props> = ({ panelName, children }) => {
    return (
        <Paper
            sx={{
                boxSizing: "border-box",
                width: "50%",
                height: "100%",
                maxHeight: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                // "& > *:nth-of-type(1)": {
                //     backgroundColor: "red !important",
                // },
            }}
        >
            <Typography
                align="center"
                variant="h4"
                sx={{
                    pl: "10px",
                    py: 0.5,
                    // mt: 6,

                    color: grey[600],
                }}
            >
                {panelName}
            </Typography>
            <Box
                sx={{
                    height: "100%",

                    maxHeight: "100% !important",
                    background: "green",
                    "& > *": {
                        p: "10px",
                        width: "100%",
                        height: "100% !important",

                        // minHeight: "100% !important",
                        // maxHeight: "100% !important",
                        overflowY: "auto !important",
                    },
                }}
            >
                {children}
            </Box>
        </Paper>
    );
};

export default Panel;
