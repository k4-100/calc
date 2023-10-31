import { blue, grey } from "@mui/material/colors";
import { Box, ListItem, Typography } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { ChangeEvent, useEffect, useState } from "react";
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

    // const [currentPanelSheet, setCurrentPanelSheet] =
    //     useState<null | MarkdownPanelSheetObjectType>(null);
    const { mode, markdownPanels, markdownPanelsRemote, token, miscellaneous } =
        useSelector((state: any) => state);
    const dispatch = useDispatch();

    const currentPanelSheet: null | MarkdownPanelSheetObjectType =
        mode === ProfileVariantEnum.Online
            ? markdownPanelsRemote
            : markdownPanels[index];
    // : markdownPanelsRemote.panels[index];

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

    useEffect(
        () => {
            const handlePanelChange = () => {
                // console.log(`trying to save id: ${currentPanel.id}`);
                if (currentPanelSheet) {
                    const currentPanelIndex =
                        currentPanelSheet.panels.findIndex(
                            (panel) =>
                                panel.id === currentPanelSheet.mainPanelID
                        );
                    console.log("currentPanelIndex: ", currentPanelIndex);
                    if (currentPanelIndex < 0) {
                        console.error(
                            "ERROR: index is wrong in handlePanelChange"
                        );
                    } else if (
                        (
                            currentPanelSheet.panels[
                                currentPanelIndex
                            ] as MarkdownPanelObjectType
                        ).content !== text
                    ) {
                        const newSheet: MarkdownPanelSheetObjectType =
                            _.cloneDeep(
                                currentPanelSheet
                            ) as MarkdownPanelSheetObjectType;
                        newSheet.panels[currentPanelIndex].content = text;

                        if (mode === ProfileVariantEnum.Local)
                            dispatch(actions.setMarkdownSheet(newSheet));
                        else dispatch(actions.setMarkdownSheetRemote(newSheet));
                    }
                }
            };

            let timerID = setTimeout(() => handlePanelChange(), 1000);
            return () => clearTimeout(timerID);
        },
        [currentPanelSheet, dispatch, index, mode, text]
        // [index, mode, currentPanelSheet, dispatch, text]
    );

    useEffect(() => {
        if (currentPanelSheet) {
            const currentPanel =
                currentPanelSheet?.panels[
                    currentPanelSheet.panels.findIndex(
                        (panel) => panel.id === currentPanelSheet.mainPanelID
                    )
                ];
            setText(currentPanel?.content as string);
            setLoading(false);
        }
    }, [currentPanelSheet]);

    // if (loading) return <> loading...</>;

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
                {loading ? (
                    <Typography> Loading...</Typography>
                ) : (
                    <>
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
                                                    children={String(
                                                        children
                                                    ).replace(/\n$/, "")}
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                />
                                            ) : (
                                                <code
                                                    {...props}
                                                    className={className}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                />
                            </Box>
                        </Panel>
                    </>
                )}
            </Box>
            <SaveBar app={AppVariantEnum.Markdown} />
        </Box>
    );
};

export default TextEditor;
