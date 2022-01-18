import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav">
      <a href="#about-project" className="nav-link">
        О проекте
      </a>
      <a href="#tech" className="nav-link">
        Технологии
      </a>
      <a href="#aboutme" className="nav-link">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;
