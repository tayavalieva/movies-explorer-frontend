import "./AboutMe.css";
import Photo from "../../../images/IMG_9403.JPG";

function AboutMe() {
  return (
    <section className="about-me" id="aboutme">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__flex-container">
        <div className="about-me__text">
          <h3 className="about-me__content-title">Тая</h3>
          <p className="about-me__content-subtitle">Фронтенд-разработчик</p>
          <p className="about-me__content">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <nav className="about-me__socials">
            <a
              href="https://www.facebook.com/taya.valieva/"
              target="_blank"
              className="about-me__socials-link"
            >
              Facebook
            </a>
            <a
              href="https://github.com/tayavalieva"
              target="_blank"
              className="about-me__socials-link"
            >
              Github
            </a>
          </nav>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;
