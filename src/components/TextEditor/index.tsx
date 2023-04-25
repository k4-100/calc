import { grey } from "@mui/material/colors";
import { Box, Paper, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React from "react";
import UtilityBelt from "../common/UtilityBelt";
import Panel from "./Panel";

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
                    maxHeight: "90vh",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "space-between",
                    "& > *": {
                        m: 1,
                    },
                }}
            >
                <Panel panelName="text">
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
                </Panel>
                <Panel panelName="markdown">
                    <Box
                        sx={{
                            backgroundColor: grey[400],
                            height: "100%",
                        }}
                    ></Box>
                </Panel>
            </Box>
        </Box>
    );
};

export default TextEditor;
