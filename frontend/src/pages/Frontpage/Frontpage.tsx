import { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import "./Frontpage.css";

export const Frontpage = () => {
  useEffect(() => {
    document.title = "Trailmates - Hjem";
  }, []);
  return (
    <div className="offset-container">
      <Header />
      <SplitSection />
      <div className="frontpage-container">
        <TripSection text="Toppreiser" textColor="black" />
        <TripSection text="Drømmereiser under 10 000kr" textColor="black" />
        <TripSection text="Anbefalt for deg" textColor="black" />
      </div>
    </div>
  );
};
