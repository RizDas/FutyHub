import React from "react";

const Leaderboard = (teams) => {
  const sortedTeams = [...teams].sort((a, b) => {
    const pointsA = a.points || 0;
    const pointsB = b.points || 0;

    if (pointsA == pointsB) {
      const gfA = a.gf || 0;
      const gfB = b.gf || 0;
      const gaA = a.ga || 0;
      const gaB = b.ga || 0;

      const gdA = gfA - gaA;
      const gdB = gfB - gaB;

      if (gdA == gdB) {
        return gfB - gfA;
      } else {
        return gdB - gdA;
      }
    } else {
      return pointsB - pointsA;
    }
  });

  return sortedTeams;
};

export default Leaderboard;
