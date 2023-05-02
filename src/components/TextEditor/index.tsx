import { blue, grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import UtilityBelt from "../common/UtilityBelt";
import Panel from "./Panel";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MarkdownPanelObjectType } from "../../utility/Classes";
import { actions } from "../../store";

const TextEditor: React.FC = () => {
    const index = Number(useParams().index) - 1;
    const { markdownPanels } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const currentPanel: MarkdownPanelObjectType = markdownPanels[index];

    const [text, setText] = useState<string>(currentPanel.content || "");

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    // console.log(currentPanel);

    const handlePanelChange = useCallback(() => {
        console.log(`trying to save id: ${currentPanel.id}`);
        if (currentPanel.content !== text) {
            console.log(`saved id: ${currentPanel.id}`);
            dispatch(
                actions.setContentForPanel({
                    panelID: currentPanel.id,
                    content: text,
                })
            );
        }
    }, [currentPanel.content, currentPanel.id, dispatch, text]);

    useEffect(() => {
        let timerID = setTimeout(() => handlePanelChange(), 3000);

        return () => clearTimeout(timerID);
    }, [handlePanelChange]);

    return (
        <Box>
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
                            },
                            "& blockquote": {
                                borderLeft: `3px solid ${grey[500]}`,
                                pl: "10px",
                                // background: grey[600],
                            },
                            "& h1": {
                                mt: "60px !important",
                                mb: "30px",
                                pb: "5px",
                                borderBottom: `2px solid ${grey[600]}`,
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
