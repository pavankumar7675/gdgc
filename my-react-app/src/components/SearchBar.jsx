import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
