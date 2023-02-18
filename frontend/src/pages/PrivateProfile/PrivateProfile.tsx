import "./PrivateProfile.css";
import profilepic from "../../components/assets/profilepic.png";
import { ProfileItem } from "../../components/ProfileItem/ProfileItem";
import { Button } from "../../components/Button/Button";
import { useEffect, useContext } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";

export const PrivateProfile = () => {
  useEffect(() => {
    document.title = "Min Profil";
  }, []);

  const { currentUser } = useContext(UserContext);

  return (
    <div className="container-privateprofile">
      {currentUser ? (
        <>
          <div className="container-aboutme">
            <div
              className="private-profile-img"
              style={{ backgroundImage: `url(${profilepic})` }}
            />
            <div className="container-text flex-column">
              <div className="title-aboutme flex-row">
                <h2>Om meg</h2>
                <div className="title-decoration-1"></div>
              </div>
              <div className="aboutme-text">
                <p>{currentUser.aboutUser}</p>
                <a className="edit-button" style={{ fontSize: "1.2vw" }}>
                  Endre bio
                </a>
              </div>
            </div>
          </div>
          <div className="container-userinfo flex-column">
            <div className="title-profile flex-row">
              <h1>Min Profil</h1>
              <div className="title-decoration-2"></div>
            </div>
            <div className="container-infoboxes flex-column">
              <ProfileItem info={currentUser.name} title="Navn" />
              <ProfileItem
                info={currentUser.age?.toString() || ""}
                title="Alder"
              />
              <ProfileItem
                info={currentUser.placeOfResidence || ""}
                title="Bosted"
              />
              <ProfileItem
                info={currentUser.phoneNumber?.toString() || ""}
                title="Telefon"
              />

              <div className="infobox-cta-section flex-row">
                <Button
                  text="Endre Epost"
                  styling="secondary-fill"
                  width="25%"
                />
                <Button
                  text="Endre Passord"
                  styling="secondary-fill"
                  width="25%"
                />
                <Button
                  text="Logg ut"
                  styling="secondary-outline"
                  width="25%"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
