import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks: React.FC = () => {
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive && "active"}`;

  return (
    <div className="container-nav-links">
      <NavLink className={activeStyle} end to="/">
        Utforsk
      </NavLink>
      <NavLink className={activeStyle} end to="/minereiser">
        Mine Reiser
      </NavLink>
      <NavLink className={activeStyle} end to="/favoritter">
        Favoritter
      </NavLink>
    </div>
  );
};

export default NavLinks;
