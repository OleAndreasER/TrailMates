import { useState } from "react";
import { ReactComponent as FilledHeart } from "../../resources/media/heart-filled-icon.svg";
import "./TripCard.css";

const tripDummyObj = {
  id: 1,
  destination: "Musée du Louvre",
  img: "https://www.planetware.com/wpimages/2021/11/france-top-attractions-musee-du-louvre.jpg",
  country: "Frankrike",
  rating: 4.5,
  estimatedCost: 45000,
};

export const TripCard = () => {
  // TODO: Check if the logged in user has liked this trip already.
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    // TODO: link a backend call to save the liked status.
    setLiked(!liked);
  };

  return (
    <div className="card-container">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${tripDummyObj.img})` }}
      >
        <FilledHeart
          className={`heart ${liked && "filled"}`}
          onClick={handleClick}
        />
      </div>
      <h3>{tripDummyObj.destination}</h3>
      <h4>{tripDummyObj.country}</h4>
      <h5>Vurdering: {tripDummyObj.rating}/5</h5>
      <h5>Estimert kostnad: {tripDummyObj.estimatedCost} NOK</h5>
    </div>
  );
};
