import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import NavLinks from "../NavLinks/NavLinks";
import Searchbar from "../Searchbar/Searchbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button } from "../Button/Button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setVisible(prevScrollPos > scrollTop || scrollTop < 10);
      setPrevScrollPos(scrollTop);
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

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
        text="Logg inn"
        styling={
          isScrolled || location.pathname !== "/"
            ? "accent-outline"
            : "secondary-outline"
        }
      />
    </nav>
  );
};
