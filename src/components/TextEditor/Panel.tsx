import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ReactNode } from "react";

import TextareaAutosize from "@mui/base/TextareaAutosize";

type Props = {
    panelName: string;
    children?: ReactNode;
};

const Panel: React.FC<Props> = ({ panelName, children }) => {
    return (
        <Paper
            sx={{
                overflow: "hidden",
                // boxSizing: "border-box",
                width: "50%",
                height: "100%",
            }}
        >
            <Typography
                align="center"
                variant="h4"
                sx={{
                    // px: 1,

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
