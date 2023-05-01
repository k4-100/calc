import { blue, grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { ChangeEvent, useState } from "react";
import UtilityBelt from "../common/UtilityBelt";
import Panel from "./Panel";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

const TextEditor: React.FC = () => {
    const [text, setText] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <Box
            sx={
                {
                    // height: "85vh",
                    // maxHeight: "85vh",
                }
            }
        >
            <UtilityBelt />
            <Box
                sx={{
                    margin: 2,
                    // height: "100%",
                    maxHeight: "60vh",
                    display: "flex",
                    justifyContent: "space-between",
                    "& > *": {
                        // height: "100%",
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
                            display: "block",
                            backgroundColor: grey[800],
                            color: "white",
                            fontSize: "18px",
                            resize: "none",
                        }}
                    />
                </Panel>
                <Panel panelName="markdown">
                    <Box
                        sx={{
                            backgroundColor: grey[900],

                            overflowY: "auto",
                            "& > *:first-of-type": { mt: 0 },
                            "& a": {
                                color: `${blue[500]} !important`,
                            },
                            "& table": {
                                borderSpacing: 0,
                                borderCollapse: "collapse",
                            },
                            "& td": {
                                border: `1px solid ${grey[800]}`,
                                // backgroundColor: grey[800],
                                // backgroundColor: grey[800],
                            },
                        }}
                    >
                        <ReactMarkdown
                            children={text}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                code({
                                    node,
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }) {
                                    const match = /language-(\w+)/.exec(
                                        className || ""
                                    );
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            {...props}
                                            children={String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                        />
                                    ) : (
                                        <code {...props} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        />
                    </Box>
                </Panel>
            </Box>
        </Box>
    );
};

export default TextEditor;
