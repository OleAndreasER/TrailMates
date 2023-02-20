import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import NavLinks from "../NavLinks/NavLinks";
import Searchbar from "../Searchbar/Searchbar";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { Button } from "../Button/Button";
import { UserContext } from "../../authentication/UserProvider";
import { logOut } from "../../authentication/authentication";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Close } from "../assets/navbar_close.svg";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setVisible(prevScrollPos > scrollTop || scrollTop < 10);
      setPrevScrollPos(scrollTop);
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  const handleClick = () => {
    if (currentUser) {
      logOut();
    } else {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isSmallScreen) {
    return (
      <nav
        className={`navbar ${
          isScrolled || location.pathname !== "/" ? "scrolled" : ""
        }`}
      >
        <img
          src={logo}
          alt="Trailmates Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <Searchbar type="nav" width="50%" height="30%" />
        <>
          <div className="nav-right-mobile">
            <a onClick={toggleMenu}>
              <Hamburger />
            </a>
          </div>
          {isOpen && (
            <>
              <a className="close-mobile" onClick={toggleMenu}>
                <Close />
              </a>
              <NavLinks onClick={toggleMenu} />
            </>
          )}
        </>
      </nav>
    );
  } else {
    return (
      <nav
        className={`navbar ${
          isScrolled || location.pathname !== "/" ? "scrolled" : ""
        }`}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        <img
          src={logo}
          alt="Trailmates Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <Searchbar type="nav" />
        <NavLinks />
        <Button
          text={currentUser ? "Logg ut" : "Logg inn"}
          styling={
            isScrolled || location.pathname !== "/"
              ? "accent-outline"
              : "secondary-outline"
          }
          width="12%"
          height="20%"
          onClick={handleClick}
        />
        {currentUser && (
          <Button
            text="Profil"
            styling={
              isScrolled || location.pathname !== "/"
                ? "accent-outline"
                : "secondary-outline"
            }
            width="5%"
            height="20%"
            onClick={() => navigate("/profile")}
          />
        )}
      </nav>
    );
  }
};
