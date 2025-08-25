import React from "react";

const Leaderboard = (teams) => {
  const sortedTeams = [...teams].sort((a, b) => {
    const pointsA = a.points || 0;
    const pointsB = b.points || 0;
    return pointsB - pointsA;
  });

  return sortedTeams;
};

export default Leaderboard;
