import React from "react";
import _ from "lodash";
import { Box, Button, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../../../store";
import { useParams } from "react-router-dom";
import {
    CellClass,
    MarkdownPanelObjectType,
    MarkdownPanelSheetObjectType,
    ProfileVariantEnum,
    SheetClassObjectType,
    TableClassObjectType,
} from "../../../utility/Classes";
import { blue } from "@mui/material/colors";
import { DeleteOutline } from "@mui/icons-material";

/**
 *
 * @returns MarkdownBarButton Button in a Save representing MarkdownPanel
 */
const MarkdownBarButton: React.FC<{ name: string; id: number }> = ({
    name,
    id,
}) => {
    const index = Number(useParams().index) - 1;
    const { mode, markdownPanels } = useSelector((state: any) => state);
    const sheet: MarkdownPanelSheetObjectType = markdownPanels[index];

    const dispatch = useDispatch();

    /**
     * erases data from the panel with matching id
     * @param id id of the panel to clear
     */
    const handleEraseClick = (id: number) => {
        const _sheet: MarkdownPanelSheetObjectType = _.cloneDeep(sheet);
        const eraseIndex = _sheet.panels.findIndex(
            (tab: MarkdownPanelObjectType) => tab.id === id
        );
        console.log(eraseIndex);
        _sheet.panels[eraseIndex].content = "";

        dispatch(actions.setMarkdownSheet(_sheet));
    };

    /**
     * switches to another main table
     * @param id id of a new main table
     */
    const handleSwitchToNext = (id: number) => {
        console.log(id);
        const _sheet = _.cloneDeep(sheet);
        _sheet.mainPanelID = id;

        dispatch(actions.setMarkdownSheet(_sheet));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                mx: 0.5,
            }}
        >
            <Button
                onClick={() => handleSwitchToNext(id)}
                variant="contained"
                sx={{
                    borderRadius: 0,
                    width: 1,
                    backgroundColor:
                        sheet.mainPanelID !== id ? "" : `${blue[600]}`,
                }}
            >
                {name}
            </Button>
            <Tooltip title="Erase content">
                <Button
                    onClick={() => handleEraseClick(id)}
                    variant="contained"
                    color="error"
                    sx={{
                        minWidth: "0",
                        borderRadius: 0,
                        width: "50px",
                        p: 0,
                    }}
                    disabled={sheet.panels.length < 2}
                >
                    <DeleteOutline sx={{}} />
                </Button>
            </Tooltip>
        </Box>
    );
};

export default MarkdownBarButton;
