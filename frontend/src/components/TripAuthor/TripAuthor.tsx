import { Button } from "../Button/Button";
import Edit from "../assets/Edit.svg";
import Remove from "../assets/Trashcan.svg";
import "./TripAuthor.css";

interface Props {
  author: string;
  trips: number;
  profilePic: string;
}

export const TripAuthor = ({ author, trips, profilePic }: Props) => {
  return (
    <div className="trippage-profile-container flex-row">
      <div className="trippage-profile-left flex-column">
        <h2>SKREVET AV</h2>
        <img src={profilePic} alt="" id="trippage-profile" />
        <h3>{author}</h3>
        <p>{trips} reiser</p>
        <Button
          text={"Vis profil"}
          styling={"accent-outline"}
          width={"70%"}
          height={"3vh"}
        ></Button>
      </div>
      <div className="flex-column trippage-profile-buttons">
        <img src={Edit} alt="" />
        <img src={Remove} alt="" />
      </div>
    </div>
  );
};
