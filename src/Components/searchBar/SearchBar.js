import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import API from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar-input"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="dropdown">
          <div className="dropdown-toggle">
            All Difficulties
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
          </div>
          <div className="dropdown-menu">
            <div onClick={() => setDifficulty("")}>All Difficulties</div>
            <div onClick={() => setDifficulty("Easy")}>Easy</div>
            <div onClick={() => setDifficulty("Medium")}>Medium</div>
            <div onClick={() => setDifficulty("Hard")}>Hard</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown-toggle">
            All Categories
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
          </div>
          <div className="dropdown-menu">
            <div onClick={() => setCategory("")}>All Categories</div>
            <div onClick={() => setCategory("Breakfast")}>Breakfast</div>
            <div onClick={() => setCategory("Brunch")}>Brunch</div>
            <div onClick={() => setCategory("Lunch")}>Lunch</div>
            <div onClick={() => setCategory("Dinner")}>Dinner</div>
            <div onClick={() => setCategory("Dessert")}>Dessert</div>
            <div onClick={() => setCategory("Snack")}>Snack</div>
            <div onClick={() => setCategory("Vegetarian")}>Vegetarian</div>
            <div onClick={() => setCategory("Vegan")}>Vegan</div>
            <div onClick={() => setCategory("Gluten-Free")}>Gluten-Free</div>
            <div onClick={() => setCategory("Others")}>Others</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown-toggle">
            Sort By
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
          </div>
          <div className="dropdown-menu">
            <div onClick={() => setSortBy("")}>Sort By</div>
            <div onClick={() => setSortBy("newest")}>Newest</div>
            <div onClick={() => setSortBy("oldest")}>Oldest</div>
            <div onClick={() => setSortBy("mostPopular")}>Most Popular</div>
            <div onClick={() => setSortBy("highestRated")}>Highest Rated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
