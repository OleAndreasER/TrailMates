import "./PrivateProfile.css";
import profilepic from "../../components/assets/profilepic.png";
import { ProfileItem } from "../../components/ProfileItem/ProfileItem";
import { User } from "../../types/user";
import { Button } from "../../components/Button/Button";

const obj: User = {
  _id: 1,
  name: "Jane Doe",
  age: 22,
  country: "Trondheim, Norge",
  mail: "janedoe@stud.ntnu.no",
  phone: 98549462,
  aboutme:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export const PrivateProfile = () => {
  return (
    <div className="container-privateprofile">
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
            <p>{obj.aboutme}</p>
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
          <ProfileItem info={obj.name} title="Navn" />
          <ProfileItem info={obj.age.toString() + " år"} title="Alder" />
          <ProfileItem info={obj.country} title="Bosted" />
          <ProfileItem info={obj.phone.toString()} title="Telefon" />

          <div className="infobox-cta-section flex-row">
            <Button text="Endre Epost" styling="secondary-fill" width="25%" />
            <Button text="Endre Passord" styling="secondary-fill" width="25%" />
            <Button text="Logg ut" styling="secondary-outline" width="25%" />
          </div>
        </div>
      </div>
    </div>
  );
};
