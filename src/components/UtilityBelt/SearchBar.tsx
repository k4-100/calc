import React from "react";
/**
 *
 * @returns Search Bar
 */
const SearchBar: React.FC = () => {
  return (
    <div className="SearchBar">
      <div className="d-flex m-2">
        <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
        <input
          className="form-control w-25"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
