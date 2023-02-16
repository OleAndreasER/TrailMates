import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import { ReactComponent as SearchIcon } from "../assets/search_icon.svg";
import NavLinks from "../NavLinks/NavLinks";
import { Button } from "../Button/Button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <img src={logo} alt="Trailmates Logo" className="logo" />
      <form className="search-div">
        <input
          type="text"
          placeholder="Mine neste reise går til.."
          name="search"
          className="search-bar"
        />
        <button type="submit" className="search-button-nav">
          <SearchIcon />
        </button>
      </form>
      <NavLinks />
    </nav>
  );
};
