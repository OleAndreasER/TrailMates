import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import Footer from "./components/Footer/Footer";
import UserProvider from "./authentication/UserProvider";
import { PrivateProfile } from "./pages/PrivateProfile/PrivateProfile";
import { PublicProfile } from "./pages/PublicProfile/PublicProfile";
import { ToTopButton } from "./components/ToTopButton/ToTopButton";
import { TripPage } from "./pages/TripPage/TripPage";
import { TripForm } from "./pages/TripForm/TripForm";
import Searchresults from "./pages/Searchresults/Searchresults";
import { MyTrips } from "./pages/MyTrips/MyTrips";

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/profile" element={<PrivateProfile />} />
            <Route path="/profile/:uid" element={<PublicProfile />} />
            <Route path="/reiserute/:tripId" element={<TripPage />} />
            <Route path="/createtrip/" element={<TripForm />} />
            <Route path="/createtrip/:tripId" element={<TripForm />} />
            <Route path="/search" element={<Searchresults />} />
            <Route path="/mytrips" element={<MyTrips />} />
          </Routes>
          <Footer />
        </main>
        <ToTopButton />
      </BrowserRouter>
    </UserProvider>
  );
};
