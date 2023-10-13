import { blue, grey } from "@mui/material/colors";
import { Box, ListItem } from "@mui/material";
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
import _ from "lodash";
import {
    AppVariantEnum,
    MarkdownPanelObjectType,
    MarkdownPanelSheetObjectType,
    ProfileVariantEnum,
} from "../../utility/Classes";
import SaveBar from "../common/SaveBar";
import { actions } from "../../store";
import SaveButton from "./SaveButton";
import { fetchInitialStateMarkdownRemote } from "../../utility/functions";

/**
 * Editor for markdown, with preview on the right side
 */
const TextEditor: React.FC = () => {
    const index = Number(useParams().index) - 1;
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPanelSheet, setCurrentPanelSheet] =
        useState<null | MarkdownPanelSheetObjectType>(null);
    const [currentPanelIndex, setCurrentPanelIndex] = useState<null | number>(
        null
    );
    const [currentPanel, setCurrentPanel] =
        useState<null | MarkdownPanelObjectType>(null);

    const { mode, markdownPanels, markdownPanelsRemote, token } = useSelector(
        (state: any) => state
    );
    const dispatch = useDispatch();

    // const currentPanelSheet: MarkdownPanelSheetObjectType =
    //     mode === ProfileVariantEnum.Local
    //         ? markdownPanels[index]
    //         : markdownPanelsRemote[index];

    // const currentPanelIndex: number = currentPanelSheet.panels.findIndex(
    //     (panel) => panel.id === currentPanelSheet.mainPanelID
    // );
    // const currentPanel: MarkdownPanelObjectType =
    //     currentPanelSheet.panels[currentPanelIndex];

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    useEffect(() => {
        const fetchMarkdownRemote = async () => {
            const res = await fetchInitialStateMarkdownRemote(
                token.accesstoken
            );

            dispatch(actions.setMarkdownSheetRemote(res));
        };
        if (mode === ProfileVariantEnum.Online) {
            fetchMarkdownRemote();
        }
    }, [dispatch, token.accesstoken, mode]);

    useEffect(() => {
        if (mode === ProfileVariantEnum.Local && markdownPanels) {
            setCurrentPanelSheet(markdownPanels[index]);
        }

        if (mode === ProfileVariantEnum.Online && markdownPanelsRemote) {
            setCurrentPanelSheet(markdownPanelsRemote);
        }
    }, [index, markdownPanels, markdownPanelsRemote, mode]);

    useEffect(() => {
        if (currentPanelSheet && !currentPanelIndex) {
            const _currentPanelIndex = currentPanelSheet.panels.findIndex(
                (panel) => panel.id === currentPanelSheet.mainPanelID
            );
            setCurrentPanelIndex(_currentPanelIndex);
            setCurrentPanel(
                currentPanelSheet.panels[_currentPanelIndex as number]
            );
            // debugger;
        }
    }, [currentPanelIndex, currentPanelSheet]);

    useEffect(() => {
        const handlePanelChange = () => {
            // console.log(`trying to save id: ${currentPanel.id}`);
            if (currentPanelSheet != null) {
                if (
                    (currentPanel as MarkdownPanelObjectType).content !== text
                ) {
                    const newSheet: MarkdownPanelSheetObjectType = _.cloneDeep(
                        currentPanelSheet
                    ) as MarkdownPanelSheetObjectType;
                    newSheet.panels[currentPanelIndex as number].content = text;

                    dispatch(actions.setMarkdownSheet(newSheet));
                }
            }
        };

        // let timerID = setTimeout(() => handlePanelChange(), 3000);
        // return () => clearTimeout(timerID);
    }, [currentPanel, currentPanelIndex, currentPanelSheet, dispatch, text]);

    // useEffect(() => {
    //     const handleWarningAlert = () => {
    //         alert(
    //             "WARNING: make sure html in markdown you paste is safe, additional security will be implemented in the future"
    //         );
    //     };
    //     let id: number = setTimeout(() => handleWarningAlert(), 1000);
    //     return () => clearTimeout(id);
    // }, []);

    useEffect(() => {
        if (currentPanel) {
            console.log("if (currentPanel) {");
            debugger;
            setText(
                mode === ProfileVariantEnum.Local
                    ? currentPanel.content
                    : (currentPanel as any).compressed_content
            );
            setLoading(false);
        }
    }, [currentPanel]);

    if (loading) return <> loading...</>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                // height: "100vh",
                // firefox
                scrollbarColor: "rgb(144, 202, 249)",
                // scrollbarColor: "green",
                // webkit (chrome, edge, opera, safari but not on ios)
                "& *::-webkit-scrollbar": {
                    border: "2px solid blue",
                    width: "10px",
                    height: "10px",
                    cursor: "auto",
                },
                "& *::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                },

                "& *::-webkit-scrollbar-thumb": {
                    background: "#90CAF9A6",
                },
                "& *::-webkit-scrollbar-thumb:hover": {
                    background: "#90BAF9",
                },
            }}
        >
            <UtilityBelt
                helpChildren={
                    <>
                        <ListItem>
                            Type/paste markdown code into "text" panel, it will
                            preview automatically.
                        </ListItem>
                        <ListItem>
                            App saves text automatically every 3 seconds (if
                            change occurs and in local mode).
                        </ListItem>
                    </>
                }
            >
                <SaveButton />
            </UtilityBelt>
            <Box
                sx={{
                    margin: 2,
                    // height: "100%",
                    // maxHeight: "60vh",
                    display: "flex",
                    justifyContent: "space-between",
                    "& > *": {
                        height: "78vh",
                        m: 1,
                        // p: 1,
                        // height: 0,
                        "& > div": {
                            // p: 1,
                            // maxHeight: "50%",
                            height: "85%",
                            overflow: "hidden",
                        },
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
                            // height: "50vh !important",
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
            <SaveBar app={AppVariantEnum.Markdown} />
        </Box>
    );
};

export default TextEditor;
