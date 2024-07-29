import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SearchInput.css";

const SearchInput = ({ searchTerm, setSearchTerm, clearSearch }) => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Search for recipes or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-input"
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      {searchTerm && (
        <FontAwesomeIcon
          icon={faTimes}
          className="clear-icon"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default SearchInput;
