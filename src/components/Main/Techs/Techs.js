import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__content-title">7 технологий</h3>
      <p className="techs__content">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-el">HTML</li>
        <li className="techs__list-el">CSS</li>
        <li className="techs__list-el">JS</li>
        <li className="techs__list-el">React</li>
        <li className="techs__list-el">Git</li>
        <li className="techs__list-el">Express.js</li>
        <li className="techs__list-el">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
