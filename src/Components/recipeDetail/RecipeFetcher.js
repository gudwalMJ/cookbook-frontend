import { useEffect } from "react";
import API from "../../api/api";

const useFetchRecipe = (id, setRecipe, setIsLoading, setError) => {
  useEffect(() => {
    setIsLoading(true);
    API.get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch recipe details");
        setIsLoading(false);
      });
  }, [id, setRecipe, setIsLoading, setError]);
};

export default useFetchRecipe;
