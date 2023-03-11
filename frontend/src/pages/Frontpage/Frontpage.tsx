import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import { getLatestTrips, getTopRatedTrips, getTrips } from "../../trips/trip";
import "./Frontpage.css";
import { Trip } from "../../types/types";

export const Frontpage = () => {
  const [recommendedTrips, setRecommendedTrips] = useState<Trip[]>([]);
  const [topRatedTrips, setTopRatedTrips] = useState<Trip[]>([]);
  const [latestTrips, setLatestTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getTrips().then(setRecommendedTrips);
    getTopRatedTrips().then(setTopRatedTrips);
    getLatestTrips().then(setLatestTrips);
  }, []);

  useEffect(() => {
    document.title = "Trailmates - Hjem";
  }, []);

  return (
    <div className="offset-container">
      <Header />
      <SplitSection />
      <div className="frontpage-container">
        <TripSection
          trips={topRatedTrips}
          text="Toppreiser"
          textColor="black"
        />
        <TripSection
          trips={latestTrips}
          text="Nylig publisert"
          textColor="black"
        />
        <TripSection
          trips={recommendedTrips}
          text="Anbefalt for deg"
          textColor="black"
        />
      </div>
    </div>
  );
};
