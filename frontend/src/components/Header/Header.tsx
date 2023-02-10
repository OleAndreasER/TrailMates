import { NavLink } from "react-router-dom";
import "./Header.css";
import Searchbar from "../Searchbar/Searchbar";

export const Header = () => {
  return (
    <header>
      <div id="searchbar-container">
        <Searchbar type="nav" width="70%"/>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-link">
              Frontpage
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
