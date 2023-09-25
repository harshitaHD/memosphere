import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h3>
        <span>
          <i className="fa-solid fa-feather-pointed"></i>
        </span>
        MemoSphere
        <i className="fa-solid fa-feather-pointed fa-rotate-180"></i>
      </h3>
    </div>
  );
};

export default Navbar;
