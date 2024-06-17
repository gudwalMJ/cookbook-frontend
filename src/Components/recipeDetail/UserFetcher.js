import { useEffect } from "react";
import API from "../../api/api";

const useFetchUser = (
  setUser,
  setIsFavorite,
  setUserLiked,
  setUserRating,
  id
) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUser(userData);
        setIsFavorite(userData.favorites.some((fav) => fav._id === id));
        const liked = userData.likedRecipes.some((liked) => liked._id === id);
        setUserLiked(liked);

        // Find the user's rating for this recipe
        const rating =
          userData.ratings &&
          userData.ratings.find((rating) => rating.recipe === id);
        if (rating) {
          setUserRating(rating.rating);
        } else {
          setUserRating(0);
        }
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data?.error || error.message
        );
      }
    };

    fetchUser();
  }, [id, setUser, setIsFavorite, setUserLiked, setUserRating]);
};

export default useFetchUser;
