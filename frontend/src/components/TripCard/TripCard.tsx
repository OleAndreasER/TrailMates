import { useState } from "react";
import { ReactComponent as FilledHeart } from "../../resources/media/heart-filled-icon.svg";
import "./TripCard.css";
import { Trip } from "../../types/types";

interface Props {
  trip: Trip;
}

export const TripCard = ({ trip }: Props) => {
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
        style={{ backgroundImage: `url(${trip.img})` }}
      >
        <FilledHeart
          className={`heart ${liked && "filled"}`}
          onClick={handleClick}
        />
      </div>
      <h3>{trip.destination}</h3>
      <h4>{trip.country}</h4>
      <h5>Vurdering: {trip.rating}/5</h5>
      <h5>Estimert kostnad: {trip.estimatedCost} NOK</h5>
    </div>
  );
};
