import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import { Footer } from "./components/Footer/Footer";
import { SplitSection } from "./components/SplitSection/SplitSection";
import { Navbar } from "./components/Navbar/Navbar";;

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
        <Header />
        <SplitSection />
        <main>
          <Routes>
            <Route path="/" element={<Frontpage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
  )};
