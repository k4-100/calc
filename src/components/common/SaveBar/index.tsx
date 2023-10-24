import React from "react";
import _ from "lodash";
import { Box, Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
    AppVariantEnum,
    MarkdownPanelObjectType,
    MarkdownPanelSheetObjectType,
    ProfileVariantEnum,
    SheetClassObjectType,
    TableClassObjectType,
} from "../../../utility/Classes";
import SheetBarButton from "./SheetBarButton";
import MarkdownBarButton from "./MarkdownBarButton";

/**
 * @param app app variant
 * @returns bar with buttons for each table/panel
 */
const SaveBar: React.FC<{ app: AppVariantEnum }> = ({ app }) => {
    const index = Number(useParams().index) - 1;

    const { mode, calc, calcRemote, markdownPanels, markdownPanelsRemote } =
        useSelector((state: any) => state);

    if (app === AppVariantEnum.Calc) {
        const sheet: SheetClassObjectType =
            mode === ProfileVariantEnum.Local ? calc[index] : calcRemote.sheet;

        return (
            <Paper
                elevation={2}
                sx={{
                    display: "flex",
                    p: 2,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        boxSizing: "border-box",
                        width: "100%",
                        // ml: "auto",
                    }}
                >
                    {sheet.tables.length &&
                        sheet.tables.map(
                            (tab: TableClassObjectType, i: number) => (
                                <SheetBarButton
                                    name={`${i + 1}`}
                                    id={tab.id}
                                    key={i}
                                />
                            )
                        )}
                </Box>
            </Paper>
        );
    }

    if (app === AppVariantEnum.Markdown) {
        const markdownSheet: MarkdownPanelSheetObjectType =
            mode === ProfileVariantEnum.Local
                ? markdownPanels[index]
                : markdownPanelsRemote;
        return (
            <Paper
                elevation={2}
                sx={{
                    display: "flex",
                    p: 2,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        boxSizing: "border-box",
                        width: "100%",
                        // ml: "auto",
                    }}
                >
                    {markdownSheet.panels.length &&
                        markdownSheet.panels.map(
                            (tab: MarkdownPanelObjectType, i: number) => (
                                <MarkdownBarButton
                                    name={`${i + 1}`}
                                    id={tab.id}
                                    key={i}
                                />
                            )
                        )}
                </Box>
            </Paper>
        );
    }

    return <>No content</>;
};

export default SaveBar;
