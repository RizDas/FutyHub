import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Leagues from "./pages/Leagues";
import Epl from "./pages/leagues/Epl";
import Laliga from "./pages/leagues/Laliga";

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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
