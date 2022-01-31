import "./Promo.css";
import NavTab from "../NavTab/NavTab";

function Promo({ onProjectClick, onTechsClick, onAboutMeClick }) {
  return (
    <section className="promo">
      <h1 className="promo__header">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab
        onProjectClick={onProjectClick}
        onTechsClick={onTechsClick}
        onAboutMeClick={onAboutMeClick}
      />
    </section>
  );
}

export default Promo;
