import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import { PrivateProfile } from "./pages/PrivateProfile/PrivateProfile";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import { Footer } from "./components/Footer/Footer";
import Searchresults from "./pages/Searchresults/Searchresults";

const fromApi = (set: Dispatch<SetStateAction<any>>) => {
  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      set(data);
    });
};

export const App = () => {
  const [message, setMessage] = useState<String>("");

  useEffect(() => fromApi((data) => setMessage(data.message)), []);

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path="/" element={<PrivateProfile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
