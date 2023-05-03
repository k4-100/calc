import React, { useState } from "react";
import _ from "lodash";
import { Button, TextField, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../../../store";
import {
    SheetClassObjectType,
    TableClassObjectType,
} from "../../../utility/Classes";
import { useParams } from "react-router-dom";
/**
 *
 * @returns Search Bar used in Calc app
 */
const SearchBar: React.FC = () => {
    const index = Number(useParams().index) - 1;
    const sheet: SheetClassObjectType = useSelector((state: any) => state.calc)[
        index
    ];
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState<string>("");

    /**
     *
     * @param e on change event
     */
    const handleTextChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchButtonClick = () => {
        if (searchQuery !== "") {
            let tableChanged: boolean = false;
            let tableIndex: number = sheet.tables.findIndex(
                (tab) => tab.id === sheet.mainTabID
            );

            if (tableIndex < 0) {
                console.error("ERROR: no such table index in SearchBar");
            }

            const _table: TableClassObjectType = _.cloneDeep(
                sheet.tables[tableIndex]
            );
            _table.cells.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.wasFound) cell.wasFound = false;
                    if (String(cell.value).includes(searchQuery)) {
                        cell.wasFound = true;
                        if (!tableChanged) tableChanged = true;
                    }
                })
            );
            const _sheet: SheetClassObjectType = _.cloneDeep(sheet);
            _sheet.tables[tableIndex] = _table;
            dispatch(actions.setSheet(_sheet));
        }
    };
    return (
        <>
            <Box
                sx={{
                    my: 1.5,
                    display: "flex",
                    boxSizing: "border-box",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        minWidth: "48px",
                        height: "100%",
                    }}
                    onClick={() => handleSearchButtonClick()}
                >
                    <Search />
                </Button>
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={(e) => handleTextChange(e)}
                    sx={{
                        // ml: 0.5,
                        height: "40px",
                        width: "150px",
                        boxSizing: "border-box",
                        "& > * > input": {
                            pb: 0.1,
                        },
                        "& > * > fieldset": {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        },
                    }}
                />
            </Box>
        </>
    );
};

export default SearchBar;
