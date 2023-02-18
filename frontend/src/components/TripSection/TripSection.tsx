import { Trip } from "../../types/types";
import { Slider } from "../Slider/Slider";
import { TripCard } from "../TripCard/TripCard";
import "./TripSection.css";

const tripDummyObjects: Trip[] = [
  {
    _id: 1,
    destination: "Musée du Louvre",
    img: "https://www.planetware.com/wpimages/2021/11/france-top-attractions-musee-du-louvre.jpg",
    country: "Frankrike",
    rating: 4.5,
    estimatedCost: 45000,
  },
  {
    _id: 2,
    destination: "Colosseum",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    country: "Italia",
    rating: 4.3,
    estimatedCost: 30000,
  },
  {
    _id: 3,
    destination: "Bo Kaap, Cape Town",
    img: "https://imageio.forbes.com/specials-images/dam/imageserve/1139828965/960x0.jpg",
    country: "Sør-Afrika",
    rating: 4.7,
    estimatedCost: 40000,
  },
  {
    _id: 4,
    destination: "El Badi Palass",
    img: "https://imageio.forbes.com/specials-images/dam/imageserve/1166259909/960x0.jpg",
    country: "Morokko",
    rating: 3.9,
    estimatedCost: 20000,
  },
  {
    _id: 5,
    destination: "Bora Bora",
    img: "https://imageio.forbes.com/specials-images/dam/imageserve/1141969923/960x0.jpg",
    country: "Fransk Polynesia",
    rating: 4.9,
    estimatedCost: 42000,
  },
];

function getDummyObjects(num: number) {
  const dummyObjects: Trip[] = [];
  for (let i = 0; i < num; i++) {
    dummyObjects.push(tripDummyObjects[i % tripDummyObjects.length]);
  }
  return dummyObjects;
}

interface Props {
  text: string;
  trips?: Trip[];
  textColor: "black" | "white";
}

export const TripSection = ({ text, trips, textColor }: Props) => {
  // TODO: Replace this with a call to the backend, or take in the trips as props.
  // Can also consider taking a function or query as a prop to display specific trips.
  const items = getDummyObjects(10).map((obj) => (
    <TripCard trip={obj} key={obj._id} color={textColor} />
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
