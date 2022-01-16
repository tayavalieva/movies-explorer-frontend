import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <nav className="footer__nav">
        <p className="footer__nav-date">© 2022</p>
        <ul className="footer__nav-list">
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://github.com/"
              target="_blank"
            >
              Github
            </a>
          </li>
          <li className="footer__nav-list-el">
            <a
              className="footer__nav-link"
              href="https://www.facebook.com/"
              target="_blank"
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
