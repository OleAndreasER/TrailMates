import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks: React.FC = () => {
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive && "active"}`;

  return (
    <ul className="nav-links">
      <li>
        <NavLink className={activeStyle} end to="/Frontpage">
          Utforsk
        </NavLink>
      </li>
      <li>
        <NavLink className={activeStyle} end to="/PrivateProfile">
          Mine Reiser
        </NavLink>
      </li>
      <li>
        <NavLink className={activeStyle} end to="/favoritter">
          Favoritter
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
