import React from "react";
import { Link } from "react-router-dom";
import "./InfoBoard.css";

const InfoBoard = () => {
  return (
    <div className="info-board">
      <h2>Welcome to our food blog!</h2>
      <div className="info-content">
        <img src="https://via.placeholder.com/150" alt="Profile" />
        <p>
          Hi! I'm Natasha Kravchuk. Here you'll find delicious, trusted recipes
          with easy step-by-step photos and videos.{" "}
          <Link to="/about">Learn more...</Link>
        </p>
      </div>
      <div className="social-icons">
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-pinterest"></i>
        </a>
        <a href="#">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  );
};

export default InfoBoard;
