import "./Promo.css";
import NavTab from "../NavTab/NavTab";

function Promo({ onProjectClick, onTechsClick, onAboutMeClick }) {
  return (
    <section className="promo">
      <h1 className="promo__header">Web Development Course Project</h1>
      <NavTab
        onProjectClick={onProjectClick}
        onTechsClick={onTechsClick}
        onAboutMeClick={onAboutMeClick}
      />
    </section>
  );
}

export default Promo;
