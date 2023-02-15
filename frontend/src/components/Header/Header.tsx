import { NavLink } from "react-router-dom";
import "./Header.css";
import Searchbar from "../Searchbar/Searchbar";
import { Button } from "../Button/Button";

export const Header = () => {
  return (
    <header>
      <div className="container start">
        <Searchbar type="nav" width="24vw" />
      </div>
      <nav className="container">
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
      <div className="container end">
        <Button styling="secondary-outline" text="Logg inn" width="12vw" />
      </div>
    </header>
  );
};
