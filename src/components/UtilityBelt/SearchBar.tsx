import React, { useState } from "react";
import _ from "lodash";
import { useGlobalContext } from "../../context";
import { TableClass } from "../../utility/TableClass";
/**
 *
 * @returns Search Bar
 */
const SearchBar: React.FC = () => {
  const { table, setTable } = useGlobalContext();
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
      let tableChanged = false;
      const _table: TableClass = _.cloneDeep(table);
      _table.cells.forEach((row) =>
        row.forEach((cell) => {
          if (cell.wasFound) cell.wasFound = false;
          if (String(cell.value).includes(searchQuery)) {
            cell.wasFound = true;
            if (!tableChanged) tableChanged = true;
          }
        })
      );
      setTable!(_table);
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
