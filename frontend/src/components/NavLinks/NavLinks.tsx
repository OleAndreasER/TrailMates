import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive && "active"}`;

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  if (isSmallScreen) {
    return (
      <div className="container-nav-links-mobile">
        <NavLink className={activeStyle} end to="/" onClick={onClick}>
          Utforsk
        </NavLink>
        <NavLink className={activeStyle} end to="/profile" onClick={onClick}>
          Mine Reiser
        </NavLink>
        <NavLink className={activeStyle} end to="/profile" onClick={onClick}>
          Favoritter
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="container-nav-links-desktop">
        <NavLink className={activeStyle} end to="/">
          Utforsk
        </NavLink>
        <NavLink className={activeStyle} end to="/profile">
          Mine Reiser
        </NavLink>
        <NavLink className={activeStyle} end to="/profile">
          Favoritter
        </NavLink>
      </div>
    );
  }
};

export default NavLinks;
