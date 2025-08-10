import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Leagues from "./pages/Leagues";
import Laliga from "./pages/leagues/Laliga";
import Seriea from "./pages/leagues/Seriea";
import Bundesliga from "./pages/leagues/Bundesliga";
import Ligue1 from "./pages/leagues/Ligue1";
import HomeWrapper from "./pages/Home";
import EplWrapper from "./pages/leagues/Epl";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/home" element={<HomeWrapper />} />
          <Route path="/about" element={<About />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/epl" element={<EplWrapper />} />
          <Route path="/laliga" element={<Laliga />} />
          <Route path="/seriea" element={<Seriea />} />
          <Route path="/bundesliga" element={<Bundesliga />} />
          <Route path="/ligue1" element={<Ligue1 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
