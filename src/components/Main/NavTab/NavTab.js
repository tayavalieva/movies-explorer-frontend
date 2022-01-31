import "./NavTab.css";

function NavTab({ onProjectClick, onTechsClick, onAboutMeClick }) {
  return (
    <nav className="nav">
      <button onClick={onProjectClick} className="nav-link">
        О проекте
      </button>
      <button onClick={onTechsClick} className="nav-link">
        Технологии
      </button>
      <button onClick={onAboutMeClick} className="nav-link">
        Студент
      </button>
    </nav>
  );
}

export default NavTab;
