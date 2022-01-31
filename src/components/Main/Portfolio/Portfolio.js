import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio-title">Портфолио</h3>
      <ul className="portfolio__projects-list">
        <li className="portfolio__project-name">
          <a
            href="https://yandex.ru/"
            className="portfolio__project-link"
            target="_blank"
          >
            <p className="portfolio__link-text ">Статичный сайт</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__project-name">
          <a
            href="https://yandex.ru/"
            className="portfolio__project-link"
            target="_blank"
          >
            <p className="portfolio__link-text ">Адаптивный сайт</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__project-name">
          <a
            href="https://yandex.ru/"
            className="portfolio__project-link"
            target="_blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
