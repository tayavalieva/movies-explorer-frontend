import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="list-el">
          <button className="nav-button">О проекте</button>
        </li>
        <li className="list-el">
          <button className="nav-button">Технологии</button>
        </li>
        <li className="list-el">
          <button className="nav-button">Студент</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
