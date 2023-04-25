import { grey } from "@mui/material/colors";
import { Box, Paper, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React from "react";
import UtilityBelt from "../common/UtilityBelt";

const TextEditor: React.FC = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                maxHeight: "100vh",
            }}
        >
            <UtilityBelt />
            <Box
                sx={{
                    margin: 2,
                    height: "100%",
                    maxHeight: "85vh",
                }}
            >
                <Paper
                    sx={{
                        boxSizing: "border-box",
                        width: "50%",
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            // px: 1,
                            pl: "10px",
                            py: 0.5,

                            color: grey[600],
                        }}
                    >
                        text
                    </Typography>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Empty"
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: grey[800],
                            color: "white",
                            padding: "10px",
                            fontSize: "18px",
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default TextEditor;
