// import React from "react";
import _ from "lodash";
import { Box, Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actions } from "../../store";
import { TableClass, TableClassObjectType } from "../../utility/Classes";
import SheetBarButton from "./SheetBarButton";

const SheetBar = () => {
    const index = Number(useParams().index) - 1;
    const sheets = useSelector((state: any) => state.calc);
    const sheet = sheets[index];
    const dispatch = useDispatch();
    /**
     * adds new table into sheet
     */
    const handleTableAdd = () => {
        const _sheet = _.cloneDeep(sheet);
        _sheet.tables.push(new TableClass(3, 4).getObject());
        dispatch(actions.setSheet(_sheet));
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
                    overflowX: "scroll",
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
                    variant="outlined"
                    color="success"
                    onClick={() => handleTableAdd()}
                    sx={{
                        width: "20px",
                    }}
                >
                    +
                </Button>
            </Box>
        </Paper>
    );
};

export default SheetBar;
