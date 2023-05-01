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
                height: "80vh",
                // maxHeight: "100%",
                // overflow: "hidden",
                // display: "flex",
                // flexDirection: "column",
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
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "red",
                    "& > *": {
                        width: "100%",
                        height: "80% !important",
                        p: "20px",
                        flex: 1,
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
