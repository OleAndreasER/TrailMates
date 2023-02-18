import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import NavLinks from "../NavLinks/NavLinks";
import Searchbar from "../Searchbar/Searchbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import { UserContext } from "../../authentication/UserProvider";
import { logOut } from "../../authentication/authentication";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

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
};
