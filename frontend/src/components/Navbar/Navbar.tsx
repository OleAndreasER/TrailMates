import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import NavLinks from "../NavLinks/NavLinks";
import Searchbar from "../Searchbar/Searchbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { Button } from "../Button/Button";
import { UserContext } from "../../authentication/UserProvider";
import { logOut } from "../../authentication/authentication";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import { ReactComponent as Close } from "../assets/navbar_close.svg";
import { LoginPopup } from "../LoginPopup/LoginPopup";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [canSetVisibility, setCanSetVisibility] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop < 120) {
        setVisible(true);
        setIsScrolled(false);
      }
      const setAsVisible = async () => {
        setVisible(prevScrollPos > scrollTop || scrollTop < 10);
        await new Promise((resolve) => {
          setCanSetVisibility(false);
          setTimeout(resolve, 250);
        }).then(() => setCanSetVisibility(true));
      };

      if (canSetVisibility || prevScrollPos < scrollTop) setAsVisible();

      setIsScrolled(scrollTop > 80);
      setPrevScrollPos(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {
    document.body.style.overflow = isShowingPopup ? "hidden" : "unset";
  }, [isShowingPopup]);

  const handleClick = () => {
    if (currentUser) {
      logOut();
    } else {
      setIsShowingPopup(true);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isSmallScreen) {
    return (
      <>
        <LoginPopup
          visible={isShowingPopup}
          setIsVisible={(val: boolean) => setIsShowingPopup(val)}
        />
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
      </>
    );
  } else {
    return (
      <>
        <LoginPopup
          visible={isShowingPopup}
          setIsVisible={(val: boolean) => setIsShowingPopup(val)}
        />
        <nav
          className={`navbar ${
            isScrolled ||
            (location.pathname !== "/reiserute" && location.pathname !== "/")
              ? "scrolled"
              : ""
          }`}
          style={{
            top: visible ? "0px" : "var(--header-offset)",
          }}
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
            className={currentUser ? "hide" : ""}
            styling={
              isScrolled ||
              (location.pathname !== "/reiserute" && location.pathname !== "/")
                ? "accent-outline"
                : "secondary-outline"
            }
            width="12%"
            height="20%"
            onClick={handleClick}
          />
          <div className="navbar-buttons-right flex-row">
            {currentUser && (
              <Button
                text=""
                className={currentUser ? "" : "hide"}
                styling={
                  isScrolled ||
                  (location.pathname !== "/reiserute" &&
                    location.pathname !== "/")
                    ? "accent-outline"
                    : "secondary-outline"
                }
                icon={isScrolled ? "plusBlue" : "plusOrange"}
                width="2vw"
                height="2vw"
                onClick={() => navigate("/createtrip")}
                fontSize="1.2vw"
              />
            )}
            {currentUser && (
              <Button
                text="Min Profil"
                styling={
                  isScrolled ||
                  (location.pathname !== "/reiserute" &&
                    location.pathname !== "/")
                    ? "accent-fill"
                    : "secondary-fill"
                }
                width="12vw"
                height="2vw"
                onClick={() => navigate("/profile")}
                fontSize="1.2vw"
              />
            )}
          </div>
        </nav>
      </>
    );
  }
};
