import React, { useState } from "react";
import _ from "lodash";
import { useGlobalContext } from "../../context";
import { TableClass, SheetClass } from "../../utility/Classes";
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
    <div className="SearchBar">
      <div className="d-flex m-2">
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={() => handleSearchButtonClick()}
        >
          Search
        </button>
        <input
          className="form-control w-25"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => handleTextChange(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
