// import React from "react";
import _ from "lodash";
import { Box, Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actions } from "../../store";
import {
    SheetClassObjectType,
    TableClass,
    TableClassObjectType,
} from "../../utility/Classes";
import SheetBarButton from "./SheetBarButton";

/**
 * @returns bar containing other tables buttons, as well as allowing to remove/add them
 */
const SheetBar = () => {
    const index = Number(useParams().index) - 1;
    const sheets = useSelector((state: any) => state.calc);
    const sheet: SheetClassObjectType = sheets[index];
    const dispatch = useDispatch();
    const reachedLimit: boolean = sheet.tables.length >= 3;

    /**
     * adds new table into sheet
     */
    const handleTableAdd = () => {
        if (!reachedLimit) {
            const _sheet = _.cloneDeep(sheet);
            _sheet.tables.push(new TableClass(26, 26).getObject());
            dispatch(actions.setSheet(_sheet));
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                display: "flex",
                position: "fixed",
                bottom: 0,
                p: 1,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    pr: 5,
                    boxSizing: "border-box",
                    // ml: "auto",
                }}
            >
                {sheet.tables.length &&
                    sheet.tables.map((tab: TableClassObjectType, i: number) => (
                        <SheetBarButton name={`${i + 1}`} id={tab.id} key={i} />
                    ))}
            </Box>
            <Box
                sx={{
                    ml: "auto",
                    pl: 5,
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    disabled={reachedLimit}
                    onClick={() => handleTableAdd()}
                    sx={{
                        fontSize: "24px",
                    }}
                >
                    +
                </Button>
            </Box>
        </Paper>
    );
};

export default SheetBar;
