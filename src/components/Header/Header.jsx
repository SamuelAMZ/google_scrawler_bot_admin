import React from "react";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  return (
    <div className="header-container">
      <div className="header-elm">
        {/* hello */}
        <h2>{page}</h2>
        {/* new btn */}
        <a href="/new">
          <button className="btn btn-primary">New Search</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
