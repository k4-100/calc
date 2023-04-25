import { grey } from "@mui/material/colors";
import { Box, Paper, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { ChangeEvent, useState } from "react";
import UtilityBelt from "../common/UtilityBelt";
import Panel from "./Panel";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const TextEditor: React.FC = () => {
    const [text, setText] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const getText = () => text;

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
                        value={text}
                        onChange={(e) => handleTextChange(e)}
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: grey[800],
                            color: "white",
                            padding: "10px",
                            fontSize: "18px",
                            overflowY: "auto",
                        }}
                    />
                </Panel>
                <Panel panelName="markdown">
                    <Box
                        sx={{
                            backgroundColor: grey[400],
                            height: "100%",
                            p: "10px",
                            overflowY: "auto",
                            "& > *:first-of-type": {
                                mt: 0,
                            },
                        }}
                    >
                        <ReactMarkdown children={text} />
                    </Box>
                </Panel>
            </Box>
        </Box>
    );
};

export default TextEditor;
