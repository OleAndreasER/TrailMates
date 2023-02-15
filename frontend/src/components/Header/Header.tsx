import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.svg";

export const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="Trailmates Logo" className="logo"/>
        <form className="search-div">
          <input
            type="text"
            placeholder="Mine neste reise går til.."
            name="search"
            className="search-bar"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <ul>
          <li>
            <NavLink to="/users" className="nav-link">
              Utforsk
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-link">
              Mine Reiser
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-link">
              Favoritter
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
};
