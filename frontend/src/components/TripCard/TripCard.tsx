import { useState } from "react";
import { ReactComponent as FilledHeart } from "../../resources/media/heart-filled-icon.svg";
import { ReactComponent as Arrow } from "../../components/assets/card-arrow.svg";
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
        <div className="container-card-readmore flex-column">
          <FilledHeart
            className={`heart ${liked && "filled"}`}
            onClick={handleClick}
          />
          <div className="card-readmore-text">
            <div className="flex-row">
              <a>Les mer</a>
              <Arrow className="card-readmore-arrow" />
            </div>
            <div className="card-readmore-underline"></div>
          </div>
        </div>
      </div>
      <h3>{trip.destination}</h3>
      <h4>{trip.country}</h4>
      <h5>Vurdering: {trip.rating}/5</h5>
      <h5>Estimert kostnad: {trip.estimatedCost} NOK</h5>
    </div>
  );
};
