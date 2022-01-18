import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__table">
        <li className="about-project__table-cell">
          <h3 className="about-project__content-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__content">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__table-cell">
          <h3 className="about-project__content-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__content">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__timeline">
        <div className="about-project__timeline-filled about-project__timeline-20">
          <p className="about-project__timeline-label">1 неделя</p>
        </div>
        <p className="about-project__timeline-label">4 недели</p>
      </div>
      <div className="about-project__timeline-caption">
        <div className="about-project__timeline-20">
          <p className="about-project__timeline-caption-text">Back-end</p>
        </div>
        <p className="about-project__timeline-caption-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
