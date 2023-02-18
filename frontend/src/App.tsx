import { Dispatch, SetStateAction } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import Footer from "./components/Footer/Footer";
import Searchresults from "./pages/Searchresults/Searchresults";
import UserProvider from "./authentication/UserProvider";
import { PrivateProfile } from "./pages/PrivateProfile/PrivateProfile";
import { PublicProfile } from "./pages/PublicProfile/PublicProfile";
import SignInDemo from "./components/SignInDemo/SignInDemo";

const fromApi = (set: Dispatch<SetStateAction<any>>) => {
  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      set(data);
    });
};

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/login" element={<SignInDemo />} />
            <Route path="/profile" element={<PrivateProfile />} />
            <Route path="/profile/:uid" element={<PublicProfile />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </UserProvider>
  );
};
