import { Button } from "../Button/Button";
import "./TripAuthor.css";

interface Props {
  author: string;
  trips: number;
  profilePic: string;
}

export const TripAuthor = ({ author, trips, profilePic }: Props) => {
  return (
    <div className="trippage-profile-container flex-column">
      <h2>SKREVET AV</h2>
      <img src={profilePic} alt="" className="trip-page-profilepic" />
      <h3>{author}</h3>
      <p>{trips} reiser</p>
      <Button
        text={"Vis profil"}
        styling={"accent-outline"}
        width={"40%"}
        height={"3vh"}
      ></Button>
    </div>
  );
};
