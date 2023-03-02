import { Component, useEffect } from "react";
import "./TripPage.css";
import img from "../../components/assets/TripPage_header.png";
import { Button } from "../../components/Button/Button";
import { TripDetailsItem } from "../../components/TripDetailsItem/TripDetailsItem";
import profilepic from "../../components/assets/profilepic.png";

export const TripPage = () => {
  useEffect(() => {
    document.title = "Trailmates - Reiseinformajon";
  }, []);
  return (
    <>
      <div
        className="cover-TripPage flex-column"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="flex-row cover-info-container">
          <div className="flex-column cover-TripPage-info">
            <p> Av John Doe</p>
            <h1> Oslo - La Rioja</h1>
            <h2> NORGE - SPANIA</h2>
          </div>
          <div className="flex-row cover-TripPage-buttons">
            <Button
              text={"Kommentarer"}
              styling={"accent-fill"}
              width={"20%"}
              height={"3vh"}
              icon={"comment"}
            ></Button>
            <Button
              text={"# Bilder"}
              styling={"accent-fill"}
              width={"20%"}
              height={"3vh"}
              icon={"images"}
            ></Button>
            <Button
              text={"Lagre reise"}
              styling={"accent-fill"}
              width={"20%"}
              height={"3vh"}
              icon={"heart"}
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
          <div className="trippage-profile-container flex-column">
            <h2>SKREVET AV</h2>
            <img src={profilepic} alt="" className="trip-page-profilepic" />
            <h3>Jane Doe</h3>
            <p># Reiser</p>
            <Button
              text={"Vis profil"}
              styling={"accent-outline"}
              width={"40%"}
              height={"3vh"}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};
