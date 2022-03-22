import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Yandex.Practicum х BeatFilm learning project
      </p>
      <nav className="footer__nav">
        <p className="footer__nav-date">© 2022</p>
        <ul className="footer__nav-list">
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Yandex.Practicum
            </a>
          </li>
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
