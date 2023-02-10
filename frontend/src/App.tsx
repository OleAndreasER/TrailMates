import { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Frontpage } from "./pages/Frontpage/Frontpage";
import { Footer } from "./components/Footer/Footer";

const fromApi = (set: Dispatch<SetStateAction<any>>) => {
  fetch("http://localhost:3001/")
    .then((res) => res.json())
    .then((data) => {
      set(data);
    });
};

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Frontpage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
};
