import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import Footer from "../Footer/Footer";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main(props) {
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const projectRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  const handleProjectClick = () => scrollToRef(projectRef);
  const handleTechsClick = () => scrollToRef(techsRef);
  const handleAboutMeClick = () => scrollToRef(aboutMeRef);

  return (
    <section className="main">
      <Header>
        {props.isLoggedIn ? (
          <Navigation onMenuClick={props.onMenuClick} />
        ) : (
          <>
            <Logo />
            <div className="header__auth-container">
              <Link to="/signup" className="header__auth-link">
                Sign up
              </Link>
              <Link to="/signin" className="header__auth-link">
                Sign in
              </Link>
            </div>
          </>
        )}
      </Header>

      <main>
        <Promo
          onProjectClick={handleProjectClick}
          onTechsClick={handleTechsClick}
          onAboutMeClick={handleAboutMeClick}
        />
        <AboutProject ref={projectRef} />
        <Techs ref={techsRef} />
        <AboutMe ref={aboutMeRef} />
        <Portfolio />
      </main>
      <Footer />
    </section>
  );
}

export default Main;
