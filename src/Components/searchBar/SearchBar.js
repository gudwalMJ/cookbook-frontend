import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ setRecipes, setIsLoading, setNoResults, setError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDifficulty("");
    setCategory("");
    setSortBy("");
    setRecipes([]);
    setIsLoading(false);
    setNoResults(false);
    setError("");
  };

  return (
    <div className="search-bar-container">
      <FontAwesomeIcon
        icon={faSlidersH}
        className="filter-icon"
        onClick={handleToggleExpand}
      />
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={clearSearch}
      />
      {isExpanded && (
        <SearchOptions
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setRecipes={setRecipes}
          setIsLoading={setIsLoading}
          setNoResults={setNoResults}
          setError={setError}
        />
      )}
    </div>
  );
};

export default SearchBar;
