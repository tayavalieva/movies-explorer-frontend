import "./Navigation.css";
import Logo from "../Logo/Logo";
import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ onMenuClick, isSideModalOpen }) {
  return (
    <>
      <nav className="header__nav">
        <div className="header__nav-films">
          <Logo />
          <NavLink to="/movies" className="header__nav-link">
            Фильмы
          </NavLink>
          <NavLink to="saved-movies" className="header__nav-link">
            Сохраненные фильмы
          </NavLink>
        </div>
        <NavLink to="/profile" className="header__profile">
          Аккаунт <div className="header__profile-icon"></div>
        </NavLink>
        <div className="header__menu" onClick={onMenuClick}>
          <div className="header__menu-el"></div>
          <div className="header__menu-el"></div>
          <div className="header__menu-el"></div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
