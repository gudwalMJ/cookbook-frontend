import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import API from "../../api/api";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Create a stable debounced function
  const debouncedSearch = useMemo(() => {
    return debounce(onSearch, 300);
  }, [onSearch]);

  useEffect(() => {
    // Update the debounced search whenever the search term changes
    debouncedSearch(searchTerm);

    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (searchTerm) => {
    API.get(`/recipes/search?query=${searchTerm}`)
      .then((response) => {
        setRecipes(response.data);
        if (response.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        setError("Failed to perform search. Please try again.");
      });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
