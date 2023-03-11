import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import { getTopRatedTrips, getTrips } from "../../trips/trip";
import "./Frontpage.css";
import { Trip } from "../../types/types";
import { sortTripsByDate } from "../../trips/tripMethods";

export const Frontpage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [topRatedTrips, setTopRatedTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getTrips().then((trips) => setTrips(trips));
    getTopRatedTrips().then((trips) => setTopRatedTrips(trips));
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
          trips={sortTripsByDate(trips, false)}
          text="Nylig publisert"
          textColor="black"
        />
        <TripSection trips={trips} text="Anbefalt for deg" textColor="black" />
      </div>
    </div>
  );
};
