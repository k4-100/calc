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
                overflow: "hidden",
                width: "50%",
                height: "100%",
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
            {children}
        </Paper>
    );
};

export default Panel;
