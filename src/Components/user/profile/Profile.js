import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
// Import Components
import AddRecipe from "../../addRecipe/AddRecipe";
import UserRecipes from "../../userRecipes/UserRecipes";
import RecipeCard from "../../recipeCard/RecipeCard";
// Styling
import "./Profile.css";

Modal.setAppElement("#root");

const profileImages = [
  "/images/profiles/profile_1.png",
  "/images/profiles/profile_2.png",
  "/images/profiles/profile_3.png",
  "/images/profiles/profile_4.png",
  "/images/profiles/profile_5.png",
  "/images/profiles/profile_6.png",
  "/images/profiles/profile_7.png",
  "/images/profiles/profile_8.png",
  "/images/profiles/profile_9.png",
  "/images/profiles/profile_10.png",
  // "/images/profiles/admin.webp" // Remove admin image
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState(""); // Add bio state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data;
      setUser(userData);
      setUsername(userData.username);
      setProfileImage(userData.profileImage);
      setBio(userData.bio); // Set bio from response
      if (!userData.favorites) {
        userData.favorites = []; // Initialize favorites if it's not present
      }
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data?.error || error.message
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/users/me",
        { username, password, profileImage, bio }, // Include bio in update
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully");
      setIsModalOpen(false);
      fetchUser(); // Refresh the user data
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.error || error.message
      );
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <img src={user.profileImage} alt="Profile" className="profile-image" />
      <p>Username: {user.username}</p>
      <p>Bio: {user.bio}</p> {/* Display bio */}
      <button onClick={() => setIsModalOpen(true)}>Update Profile</button>
      <button onClick={() => setIsAddRecipeModalOpen(true)}>Add Recipe</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update Profile"
        className="modal"
        overlayClassName="overlay"
      >
        <form onSubmit={handleUpdate}>
          <h2>Update Profile</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />
          <div className="profile-images">
            {profileImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Profile ${index}`}
                className={`profile-image-option ${
                  profileImage === img ? "selected" : ""
                }`}
                onClick={() => setProfileImage(img)}
              />
            ))}
          </div>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </Modal>
      <AddRecipe
        isModalOpen={isAddRecipeModalOpen}
        closeModal={() => setIsAddRecipeModalOpen(false)}
        fetchRecipes={() => {}}
      />
      <UserRecipes userId={user._id} />
      <h2>Favorite Recipes</h2>
      <div className="favorites-list">
        {user.favorites.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
