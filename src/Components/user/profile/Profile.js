// src/components/profile/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
// Import Components
import AddRecipe from "../../addRecipe/AddRecipe";
// Styling
import "./Profile.css";

Modal.setAppElement("#root"); // For accessibility

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user:", error.response.data.error);
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
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully");
      setIsModalOpen(false);
      fetchUser(); // Refresh the user data
    } catch (error) {
      console.error("Error updating profile:", error.response.data.error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
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
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </Modal>

      <AddRecipe
        isModalOpen={isAddRecipeModalOpen}
        closeModal={() => setIsAddRecipeModalOpen(false)}
        fetchRecipes={fetchUser} // Assuming fetchRecipes will refresh recipes in profile
      />
    </div>
  );
};

export default Profile;
