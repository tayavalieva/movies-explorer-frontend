import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio-title">Portfolio</h3>
      <ul className="portfolio__projects-list">
        <li className="portfolio__project-name">
          <a
            href="https://spot.nomoredomains.rocks/"
            className="portfolio__project-link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Single-page application</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__project-name">
          <a
            href="https://tayavalieva.github.io/russian-travel/index.html"
            className="portfolio__project-link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text ">Responsive landing page</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
        <li className="portfolio__project-name">
          <a
            href="https://github.com/tayavalieva/how-to-learn"
            className="portfolio__project-link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text ">Static landing page</p>
            <div className="portfolio__link-icon"></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
