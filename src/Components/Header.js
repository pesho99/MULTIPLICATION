import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
         <NavLink className="nav-link" to="/multiplication">Бутони</NavLink>
          </li>
          <li className="nav-item">
           <NavLink className="nav-link" to="/generation">Задачи</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
