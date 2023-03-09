import { Component, useEffect, useRef, useState } from "react";
import "./TripPage.css";
import img from "../../components/assets/TripPage_header.png";
import { Button } from "../../components/Button/Button";
import { TripDetailsItem } from "../../components/TripDetailsItem/TripDetailsItem";
import { ReviewBox } from "../../components/ReviewBox/ReviewBox";
import profilepic from "../../components/assets/profilepic.png";
import { TripAuthor } from "../../components/TripAuthor/TripAuthor";
import { PopupImageCarousel } from "../../components/PopupImageCarousel/PopupImageCarousel";
import caro1 from "../../components/assets/caro/caro1.png";
import caro2 from "../../components/assets/caro/caro2.png";
import caro3 from "../../components/assets/caro/caro3.png";
import caro4 from "../../components/assets/caro/caro4.png";
import { CloseButton } from "react-bootstrap";

export const TripPage = () => {
  const scrolldown = () => {
    window.scrollTo({
      top: window.innerHeight - 10,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    document.title = "Trailmates - Reiseinformajon";
  }, []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const images = [caro1, caro2, caro3, caro4];
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const scrollHandlerReviews = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="cover-TripPage flex-column"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="cover-info-container">
          <div className="flex-column cover-TripPage-info">
            <p> Av John Doe</p>
            <h1> Oslo - La Rioja</h1>
            <h2> NORGE - SPANIA</h2>
          </div>
          <div className="trippage-scrolldown-indicator">
            <a>╲╱</a>
          </div>
          <div className="flex-row cover-TripPage-buttons">
            <Button
              text={"Kommentarer"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={"comment"}
              fontSize={"1vw"}
              onClick={scrollHandlerReviews}
            ></Button>
            <Button
              text={"# Bilder"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={"images"}
              fontSize={"1vw"}
              onClick={handleOpenPopup}
            ></Button>
            <Button
              text={"Lagre reise"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={"heart"}
              fontSize={"1vw"}
            ></Button>
          </div>
        </div>
      </div>
      <div className="container-general-info flex-row">
        <div className="trippage-general-info-left flex-column">
          <div className="trippage-general-info-row flex-row">
            <TripDetailsItem title={"Startdestinasjon"} content={"Oslo"} />
            <TripDetailsItem title={"Reisemål"} content={"Spania"} />
            <TripDetailsItem title={"Land"} content={"Russland"} />
          </div>
          <div className="trippage-general-info-row flex-row">
            <TripDetailsItem title={"Pris"} content={"1MNOK"} />
            <TripDetailsItem title={"Reisetid"} content={"4 uker"} />
            <TripDetailsItem title={"Vurderinger"} content={"-3"} />
          </div>
        </div>
        <div className="trippage-general-info-right">
          <TripAuthor author={"Jane Doe"} trips={11} profilePic={profilepic} />
        </div>
      </div>
      <div className="trippage-main-container flex-row">
        <div className="trippage-main-l flex-column">
          <img src={caro1} onClick={handleOpenPopup}></img>
          <PopupImageCarousel
            images={images}
            titles={[
              "City of Rioja",
              "Celementines in Rioja",
              "City of Prague",
              "Streets in Sicily",
            ]}
            dates={[
              "09.Januar.2022",
              "11.Januar.2022",
              "10.Januar.2022",
              "12.Januar.2022",
            ]}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
          <div
            className="flex-row"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <h2>Beskrivelse</h2>
            <div
              style={{
                width: "68%",
                height: ".3vh",
                borderRadius: "100px",
                backgroundColor: "var(--accent)",
              }}
            />
          </div>
          <div className="text-wrapper">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="trippage-main-r flex-column">
          <img src={caro2}></img>
          <div
            className="flex-row"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <h2>Detaljer</h2>
            <div
              style={{
                width: "68%",
                height: ".3vh",
                borderRadius: "100px",
                backgroundColor: "var(--accent)",
              }}
            ></div>
          </div>
          <div className="trippage-extra-info"></div>
          <div className="trippage-extra-itemwrapper">
            <h3>Klima</h3>
            <p>Varmt, 30 grader celcius</p>
          </div>
          <div className="trippage-extra-itemwrapper">
            <h3>Reiselengde</h3>
            <p>1 453 kilometer</p>
          </div>
          <div className="trippage-extra-itemwrapper">
            <h3>Attraksjoner</h3>
            <p>
              Eiffeltårnet, Stockholm Universitet, Odense, Barcelona Katedral,
              Warsawa Gamlebyen
            </p>
          </div>
          <div
            style={{
              width: "80%",
              height: ".3vh",
              borderRadius: "100px",
              backgroundColor: "var(--accent)",
            }}
          />
        </div>
      </div>
      <div className="trippage-review-container flex-column" ref={sectionRef}>
        <h1>Omtaler</h1>
        <div className="review-sep" />
        <ReviewBox
          title={"En fantastisk reise! - Reiste 10. Januar 2022"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
          }
          author={"Krisitan Holgren"}
          rating={"3/5"}
          travels={"11 Reiser"}
          profilePic={profilepic}
        />
        <ReviewBox
          title={"En helt OK reise! - Reiste 12. September 2021"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
          }
          author={"Krisitan Holgren"}
          rating={"5/5"}
          travels={"10 Reiser"}
          profilePic={profilepic}
        />
      </div>
      <div className="trippage-write-review flex-column">
        <h2>Har du vært på denne reisen?</h2>
        <Button
          text={"Skriv en omtale"}
          styling={"secondary-outline"}
          width="25%"
          height="5vh"
        />
      </div>
    </>
  );
};
