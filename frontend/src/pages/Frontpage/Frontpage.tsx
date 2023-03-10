import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import { getTrips } from "../../trips/trip";
import "./Frontpage.css";
import { Trip } from "../../types/types";
import { sortTripsByDate } from "../../utils/tripMethods";

export const Frontpage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getTrips().then((trips) => {
      setTrips(trips);
    });
  }, []);

  useEffect(() => {
    document.title = "Trailmates - Hjem";
  }, []);

  return (
    <div className="offset-container">
      <Header />
      <SplitSection />
      <div className="frontpage-container">
        <TripSection trips={trips} text="Toppreiser" textColor="black" />
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
