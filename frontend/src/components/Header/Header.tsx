import { NavLink } from "react-router-dom";
import "./Header.css";
import { Button } from "../Button/Button";

export const Header = () => {
  return (
    <header>
      <form>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="search-bar"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
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
