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
          <button className="header__auth-button">Регистрация</button>
          <button className="header__auth-button">Войти</button>
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
