import { Trip } from "../../types/types";
import { Slider } from "../Slider/Slider";
import { TripCard } from "../TripCard/TripCard";
import "./TripSection.css";

interface Props {
  text: string;
  trips: Trip[];
  textColor: "black" | "white";
}

export const TripSection = ({ text, trips, textColor }: Props) => {
  const items = trips.map((trip) => (
    <TripCard trip={trip} key={trip.tripId} color={textColor} />
  ));

  return (
    <div className="trip-section">
      <h1 className="section-header-text">{text}</h1>
      <svg className="trip-section-divider">
        <rect x="0" y="0" rx="5" overflow={"visible"} />
      </svg>
      <div id="slider-container">
        <Slider items={items} />
      </div>
    </div>
  );
};
