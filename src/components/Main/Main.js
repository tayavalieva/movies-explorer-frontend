import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Footer from "../Footer/Footer";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <section className="main">
      <Header>
        <Logo />
        <div className="header__auth-container">
          <Link to="/signup" className="header__auth-link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__auth-link">
            Войти
          </Link>
        </div>
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </section>
  );
}

export default Main;
