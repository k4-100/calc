import { Paper, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ReactNode } from "react";

type Props = {
    panelName: string;
    children?: ReactNode;
};
/**
 * @param panelname name of the panel
 * @children could be either text editor, or markdown preview
 * @returns Panel inside TextEditor
 */
const Panel: React.FC<Props> = ({ panelName, children }) => {
    return (
        <Paper
            sx={{
                boxSizing: "border-box",
                width: "50%",
                height: "80vh",
            }}
        >
            <Typography
                align="center"
                variant="h4"
                sx={{
                    pl: "10px",
                    py: 0.5,
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
                    "& > *": {
                        width: "100%",
                        height: "80% !important",
                        py: "40px",
                        px: "20px",
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
