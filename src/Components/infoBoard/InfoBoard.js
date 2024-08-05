import React from "react";
import { Link } from "react-router-dom";
import "./InfoBoard.css";

const InfoBoard = () => {
  return (
    <div className="info-board">
      <h2>Welcome to our food blog!</h2>
      <div className="info-content">
        <img src="/images/profiles/admin.webp" alt="Profile" />
        <p>
          Hi! I'm Josip. Welcome to Tasty Tales, where you'll find delicious,
          trusted recipes that will surely fill your stomach with happiness.{" "}
          <Link to="/about">Learn more...</Link>
        </p>
      </div>
      <div className="social-icons">
        <i className="fab fa-instagram" aria-hidden="true"></i>
        <i className="fab fa-facebook" aria-hidden="true"></i>
        <i className="fab fa-pinterest" aria-hidden="true"></i>
        <i className="fab fa-youtube" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default InfoBoard;
