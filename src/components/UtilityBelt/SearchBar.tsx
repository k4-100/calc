import React from "react";
/**
 *
 * @returns Search Bar
 */
const SearchBar: React.FC = () => {
  return (
    <div className="SearchBar">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button> */}
      </form>
    </div>
  );
};

export default SearchBar;
