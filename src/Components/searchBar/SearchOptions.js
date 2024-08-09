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
  setRecipes,
  setIsLoading,
  setNoResults,
  setError,
  isSidebarOpen,
}) => {
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (searchTerm.trim() === "" && difficulty === "" && category === "") {
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
  }, [searchTerm, difficulty, category, debouncedSearch]);

  const handleDifficultyClick = (option) => {
    setDifficulty((prev) => (prev === option ? "" : option));
  };

  const handleCategoryClick = (option) => {
    setCategory((prev) => (prev === option ? "" : option));
  };

  return (
    <div
      className="search-options"
      style={{ left: isSidebarOpen ? "210px" : "70px" }}
    >
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
    </div>
  );
};

export default SearchOptions;
