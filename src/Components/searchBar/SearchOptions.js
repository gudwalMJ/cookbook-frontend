import React, { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import API from "../../api/api";
import "./SearchOptions.css";

const SearchOptions = ({
  searchTerm,
  setSearchTerm,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  sortBy,
  setSortBy,
  setRecipes,
  setIsLoading,
  setNoResults,
  setError,
}) => {
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

  const handleDifficultyClick = (option) => {
    setDifficulty((prev) => (prev === option ? "" : option));
  };

  const handleCategoryClick = (option) => {
    setCategory((prev) => (prev === option ? "" : option));
  };

  const handleSortByClick = (option) => {
    setSortBy((prev) => (prev === option ? "" : option));
  };

  return (
    <div className="search-options">
      <div className="filter-group">
        <div className="filter-title">Difficulty</div>
        <div className="filter-buttons">
          {["Easy", "Medium", "Hard"].map((option) => (
            <button
              key={option}
              className={`filter-button ${
                difficulty === option ? "selected" : ""
              }`}
              onClick={() => handleDifficultyClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <div className="filter-title">Category</div>
        <div className="filter-buttons">
          {[
            "Breakfast",
            "Brunch",
            "Lunch",
            "Dinner",
            "Dessert",
            "Snack",
            "Vegetarian",
            "Vegan",
            "Gluten-Free",
            "Others",
          ].map((option) => (
            <button
              key={option}
              className={`filter-button ${
                category === option ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <div className="filter-title">Sort By</div>
        <div className="filter-buttons">
          {["Newest", "Oldest", "Most Popular", "Highest Rated"].map(
            (option) => (
              <button
                key={option}
                className={`filter-button ${
                  sortBy === option ? "selected" : ""
                }`}
                onClick={() => handleSortByClick(option)}
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOptions;
