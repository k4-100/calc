import React, { useState } from "react";
import { useGlobalContext } from "../../context";
/**
 *
 * @returns Search Bar
 */
const SearchBar: React.FC = () => {
  const { table, setTable } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState<string>("pp");

  /**
   *
   * @param e on change event
   */
  const handleTextChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="SearchBar">
      <div className="d-flex m-2">
        <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
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
