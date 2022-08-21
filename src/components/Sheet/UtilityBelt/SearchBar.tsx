import React, { useState } from "react";
import _ from "lodash";
import { Button, TextField, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useGlobalContext } from "../../../context";
import { TableClass, SheetClass } from "../../../utility/Classes";
/**
 *
 * @returns Search Bar
 */
const SearchBar: React.FC = () => {
  const { sheet, setSheet } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const tableIndex = 0;

  /**
   *
   * @param e on change event
   */
  const handleTextChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery !== "") {
      let tableChanged = false;
      const _table: TableClass = _.cloneDeep(sheet.tables[0]);
      _table.cells.forEach((row) =>
        row.forEach((cell) => {
          if (cell.wasFound) cell.wasFound = false;
          if (String(cell.value).includes(searchQuery)) {
            cell.wasFound = true;
            if (!tableChanged) tableChanged = true;
          }
        })
      );
      const _sheet: SheetClass = _.cloneDeep(sheet);
      _sheet.tables[tableIndex] = _table;
      setSheet!(_sheet);
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
        {/* <input
          className="form-control w-25"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => handleTextChange(e)}
        /> */}
        <TextField
          label="Search"
          // variant="outlined"
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
