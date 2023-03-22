import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

/**
 *
 * @returns a single "save file" with info
 */
const Save: React.FC = () => {
    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 1,
                pl: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    py: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    "& > *": {
                        my: 0.5,
                    },
                }}
            >
                <Typography>App: Calc</Typography>
                <Typography>Name: text_here</Typography>
                <Typography>Date: 2002_01_01-10:30</Typography>
            </Box>
            <Button
                sx={{
                    ml: 1,
                    // py: 2,
                }}
            >
                <PlayArrow fontSize="large" />
            </Button>
        </Paper>
    );
};

export default Save;
