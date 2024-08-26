import React from "react";
import "./About.css"; // Importing the CSS for styling

const About = ({ darkMode }) => {
  return (
    <div className={`about-page ${darkMode ? "dark-mode" : ""}`}>
      <h1>About Tasty Tale</h1>
      <p>
        Welcome to Tasty Tale! Tasty Tale is a platform where food lovers, home
        cooks, and professional chefs come together to share and discover
        mouth-watering recipes from all over the world. Whether you're looking
        for your next meal inspiration, want to share your culinary creations,
        or simply explore a variety of delicious dishes, Tasty Tale is the place
        for you.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to connect people through the love of food. We believe
        that food has the power to bring people together, break cultural
        barriers, and create lasting memories. Tasty Tale provides a space for
        you to find, create, and share your favorite recipes with a community of
        like-minded food enthusiasts.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Discover a wide range of recipes from different cuisines.</li>
        <li>Share your own recipes with the community.</li>
        <li>Rate and review recipes you’ve tried.</li>
        <li>Create and manage your personal recipe collection.</li>

        <li>Explore trending and highly rated recipes.</li>
      </ul>

      <h2>Join Us</h2>
      <p>
        Becoming a part of the Tasty Tale community is easy! Sign up today to
        start exploring and sharing recipes. Whether you're a seasoned chef or a
        beginner in the kitchen, Tasty Tale welcomes everyone with a passion for
        food.
      </p>

      <p>
        Thank you for being a part of our journey. We’re excited to see what
        delicious tales you’ll create!
      </p>
    </div>
  );
};

export default About;
