import "./Header.css";
import Logo from "../Logo/Logo";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Logo />
        <div className="header__nav-films">
          <a className="header__nav-link">Фильмы</a>
          <a className="header__nav-link">Сохраненные фильмы</a>
        </div>
      </nav>
      <div className="header__auth-container">
        <button className="header__auth-button">Регистрация</button>
        <button className="header__auth-button">Войти</button>
      </div>
    </header>
  );
}

export default Header;
