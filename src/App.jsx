import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Leagues from "./pages/Leagues";
import Epl from "./pages/leagues/Epl";
import Laliga from "./pages/leagues/Laliga";
import Seriea from "./pages/leagues/Seriea";
import Bundesliga from "./pages/leagues/Bundesliga";
import Ligue1 from "./pages/leagues/Ligue1";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/epl" element={<Epl />} />
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
