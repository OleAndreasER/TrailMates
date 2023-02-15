import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks: React.FC = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink
            className={({ isActive }) =>
              [
                "nav-link",
                isActive ? "active" : null,
              ]
                .filter(Boolean)
                .join(" ")
            }
            end 
            to="/"
          >
            Utforsk
          </NavLink>
      </li>
      <li>
        <NavLink
            className={({ isActive }) =>
              [
                "nav-link",
                isActive ? "active" : null,
              ]
                .filter(Boolean)
                .join(" ")
            }
            end 
            to="/minereiser"
          >
            Mine Reiser
          </NavLink>
      </li>
      <li>
        <NavLink
            className={({ isActive }) =>
              [
                "nav-link",
                isActive ? "active" : null,
              ]
                .filter(Boolean)
                .join(" ")
            }
            end 
            to="/favoritter"
          >
            Favoritter
          </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;