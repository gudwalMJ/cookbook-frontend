import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import API from "../../api/api";
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

  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (
          searchTerm.trim() === "" &&
          difficulty === "" &&
          category === "" &&
          sortBy === ""
        ) {
          setRecipes([]);
          setIsLoading(false);
          setNoResults(false);
          return;
        }

        setIsLoading(true);
        setError("");
        setNoResults(false);

        API.get(`/recipes/search`, {
          params: {
            query: searchTerm,
            difficulty,
            category,
            sortBy,
          },
        })
          .then((response) => {
            setIsLoading(false);
            setRecipes(response.data);
            if (response.data.length === 0) {
              setNoResults(true);
            }
          })
          .catch((error) => {
            console.error("Search error:", error);
            setError("Failed to perform search. Please try again.");
            setIsLoading(false);
          });
      }, 300),
    [
      searchTerm,
      difficulty,
      category,
      sortBy,
      setRecipes,
      setIsLoading,
      setNoResults,
      setError,
    ]
  );

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, difficulty, category, sortBy, debouncedSearch]);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
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
      </div>
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
