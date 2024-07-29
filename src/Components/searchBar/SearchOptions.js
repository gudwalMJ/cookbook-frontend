import React, { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import API from "../../api/api";
import Dropdown from "./Dropdown";
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

  return (
    <div className="search-options">
      <Dropdown
        label="All Difficulties"
        options={["All Difficulties", "Easy", "Medium", "Hard"]}
        selectedOption={difficulty}
        onSelect={setDifficulty}
      />
      <Dropdown
        label="All Categories"
        options={[
          "All Categories",
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
        ]}
        selectedOption={category}
        onSelect={setCategory}
      />
      <Dropdown
        label="Sort By"
        options={[
          "Sort By",
          "Newest",
          "Oldest",
          "Most Popular",
          "Highest Rated",
        ]}
        selectedOption={sortBy}
        onSelect={setSortBy}
      />
    </div>
  );
};

export default SearchOptions;
