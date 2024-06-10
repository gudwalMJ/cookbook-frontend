import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import API from "../../api/api";
import "./SearchBar.css";

const SearchBar = ({ setRecipes, setIsLoading, setNoResults, setError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

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

        API.get(`/recipes`, {
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
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar-input"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="search-bar-filter"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-bar-filter"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Brunch">Brunch</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Others">Others</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="search-bar-filter"
        >
          <option value="">Sort By</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostPopular">Most Popular</option>
          <option value="highestRated">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
