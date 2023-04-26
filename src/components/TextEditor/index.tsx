import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { ChangeEvent, useState } from "react";
import UtilityBelt from "../common/UtilityBelt";
import Panel from "./Panel";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TextEditor: React.FC = () => {
    const [text, setText] = useState<string>("");

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const getText = () => text;

    return (
        <Box
            sx={{
                height: "85vh",
                maxHeight: "85vh",
            }}
        >
            <UtilityBelt />
            <Box
                sx={{
                    margin: 2,
                    height: "100%",
                    maxHeight: "90vh",
                    // overflow: "hidden",
                    display: "flex",
                    justifyContent: "space-between",
                    "& > *": {
                        height: "100%",
                        maxHeight: "80vh",
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
                            // width: "100%",
                            // height: "100%",
                            backgroundColor: grey[800],
                            color: "white",
                            fontSize: "18px",
                            // overflowY: "scroll",
                            // overflow: "hidden",
                        }}
                    />
                </Panel>
                <Panel panelName="markdown">
                    <Box
                        sx={{
                            backgroundColor: grey[900],

                            overflowY: "auto",
                            "& > *:first-of-type": { mt: 0 },
                        }}
                    >
                        <ReactMarkdown
                            children={text}
                            remarkPlugins={[remarkGfm]}
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
                                            style={dark}
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

// const SyntaxHighlightRenderer: React.FC<{
//     value: string;
//     language: string;
// }> = ({ value, language }) => {
//     return (
//         <SyntaxHighlighter language={language} style={docco}>
//             {value}
//         </SyntaxHighlighter>
//     );
// };
