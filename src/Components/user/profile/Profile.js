import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
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
    } catch (error) {
      console.error("Error updating profile:", error.response.data.error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={handleUpdate}>
      <h1>Profile</h1>
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
    </form>
  );
};

export default Profile;
