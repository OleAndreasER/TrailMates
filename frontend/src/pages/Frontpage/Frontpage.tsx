import { Header } from "../../components/Header/Header";
import { SplitSection } from "../../components/SplitSection/SplitSection";
import { TripSection } from "../../components/TripSection/TripSection";
import "./Frontpage.css";

export const Frontpage = () => {
  return (
    <div className="offset-container">
      <Header />
      <SplitSection />
      <div className="frontpage-container">
        <TripSection text="Toppreiser" />
        <TripSection text="Drømmereiser under 10 000kr" />
        <TripSection text="Anbefalt for deg" />
      </div>
    </div>
  );
};
