import "./NavTab.css";

function NavTab({ onProjectClick, onTechsClick, onAboutMeClick }) {
  return (
    <nav className="nav">
      <button onClick={onProjectClick} className="nav-link">
        About project
      </button>
      <button onClick={onTechsClick} className="nav-link">
        Tech stack
      </button>
      <button onClick={onAboutMeClick} className="nav-link">
        About me
      </button>
    </nav>
  );
}

export default NavTab;
