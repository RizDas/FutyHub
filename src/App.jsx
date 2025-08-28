import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Leagues from "./pages/Leagues";
import Laliga from "./pages/teams/Laliga";
import Seriea from "./pages/teams/Seriea";
import Bundesliga from "./pages/teams/Bundesliga";
import Ligue1 from "./pages/teams/Ligue1";
import HomeWrapper from "./pages/Home";
import EplWrapper from "./pages/teams/Epl";
import Teams from "./pages/Teams";
import International from "./pages/teams/International";
import Managers from "./pages/Managers";
import EplLead from "./pages/leagues/EplLead";
import LaligaLead from "./pages/leagues/LaligaLead";
import AdminHome from "./admin/AdminHome";
import AdminLeagues from "./admin/AdminLeagues";
import AdminTeams from "./admin/AdminTeams";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/home" element={<HomeWrapper />} />
          <Route path="/about" element={<About />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/international" element={<International />} />
          <Route path="/epl" element={<EplWrapper />} />
          <Route path="/laliga" element={<Laliga />} />
          <Route path="/seriea" element={<Seriea />} />
          <Route path="/bundesliga" element={<Bundesliga />} />
          <Route path="/ligue1" element={<Ligue1 />} />
          <Route path="/epl/leaderboard" element={<EplLead />} />
          <Route path="/laliga/leaderboard" element={<LaligaLead />} />
          <Route path="/futyadmin" element={<AdminHome />} />
          <Route path="/futyadmin/leagues" element={<AdminLeagues />} />
          <Route path="/futyadmin/teams" element={<AdminTeams />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
