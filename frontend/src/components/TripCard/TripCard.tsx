import { useState, useEffect } from "react";
import { ReactComponent as FilledHeart } from "../../resources/media/heart-filled-icon.svg";
import { ReactComponent as Arrow } from "../../components/assets/card-arrow.svg";
import "./TripCard.css";
import { useNavigate } from "react-router-dom";
import { getImgUrl } from "../../storage/util/methods";
import { Trip } from "../../types/types";

interface Props {
  trip: Trip;
  color: "black" | "white";
}

export const TripCard = ({ trip, color }: Props) => {
  // TODO: Check if the logged in user has liked this trip already.
  const [liked, setLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!trip.imageIds) return;
    if (trip.imageIds.length === 0) return;
    getImgUrl(`trips/${trip.tripId}/${trip.imageIds[0]}`).then(setImageUrl);
  }, [trip]);

  const handleClick = () => {
    // TODO: link a backend call to save the liked status.
    setLiked(!liked);
  };

  const handleTripLinkClicked = () => {
    navigate(`/reiserute/${trip.tripId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="card-container">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="container-card-readmore flex-column">
          <FilledHeart
            className={`heart ${liked && "filled"}`}
            onClick={handleClick}
          />
          <div className="card-readmore-text">
            <span className="flex-row" onClick={handleTripLinkClicked}>
              Les mer
              <Arrow className="card-readmore-arrow" />
            </span>
            <div className="card-readmore-underline"></div>
          </div>
        </div>
      </div>
      <div className={color}>
        <h3>{trip.destinationCity}</h3>
        <h4>{trip.countries[0]}</h4>
        <h5>Vurdering: {trip.averageRating}/5</h5>
        <h5>Estimert kostnad: {trip.price} NOK</h5>
      </div>
    </div>
  );
};
