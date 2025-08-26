import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  ArrowLeft,
  Medal,
  Target,
  Zap,
  Star,
  Flame,
} from "lucide-react";
import { Provider, useDispatch } from "react-redux";
import db from "../../firebase";
import { setTeams } from "../../features/teams/teamslice";
import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../../features/teams/teamslice";
import Leaderboard from "../../components/Leaderboard";

const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
});

function LaligaLeadInner() {
  const dispatch = useDispatch();
  const [laligaFromDb, setLaligaFromDb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || typeof db.collection !== "function") {
      console.warn(" 'db.collection' not available!");
      setLoading(false);
      return;
    }

    const unsubscribe = db.collection("teams").onSnapshot(
      (snapshot) => {
        try {
          const fetchedTeams = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(
              (t) =>
                t.league === "laliga" ||
                (t.league && t.league.toLowerCase() === "laliga")
            );

          if (fetchedTeams.length > 0) {
            const normalized = fetchedTeams.map((team, index) => ({
              id: team.id ?? index + 1,
              name: team.name ?? team.clubName ?? `Team ${index + 1}`,
              logo: team.logo ?? "/images/laliga.svg",
              points: team.points ?? Math.floor(Math.random() * 35) + 25,
              played: team.played ?? Math.floor(Math.random() * 10) + 15,
              wins: team.wins ?? Math.floor(Math.random() * 10) + 6,
              draws: team.draws ?? Math.floor(Math.random() * 6) + 3,
              losses: team.losses ?? Math.floor(Math.random() * 6) + 2,
              gf: team.gf ?? Math.floor(Math.random() * 35) + 25,
              ga: team.ga ?? Math.floor(Math.random() * 25) + 12,
              form: team.form ?? generateRandomForm(),
            }));

            // Sort teams using the Leaderboard component
            const sortedTeams = Leaderboard(normalized);
            setLaligaFromDb(sortedTeams);
            dispatch(setTeams({ laliga: sortedTeams }));
          } else {
            setLaligaFromDb([]);
          }
        } catch (err) {
          console.error("Error parsing teams snapshot:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
        setLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  const generateRandomForm = () => {
    const results = ["W", "D", "L"];
    return Array.from(
      { length: 5 },
      () => results[Math.floor(Math.random() * results.length)]
    );
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <Crown size={20} color="#FFD700" />;
    if (position === 2) return <Medal size={20} color="#C0C0C0" />;
    if (position === 3) return <Medal size={20} color="#CD7F32" />;
    if (position === 4) return <Star size={20} color="#ff6b35" />;
    if (position <= 6) return <Target size={20} color="#f7931e" />;
    if (position >= 18) return <TrendingDown size={20} color="#dc2626" />;
    return null;
  };

  const getPositionBadge = (position) => {
    if (position <= 4) return "champions-league";
    if (position <= 6) return "europa-league";
    if (position >= 18) return "relegation";
    return "";
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Cargando clasificación de La Liga...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb
            color="radial-gradient(circle, #ff6b35, transparent)"
            duration="20"
            delay="0"
            style={{ top: "10%", left: "10%", width: "300px", height: "300px" }}
          />
          <Orb
            color="radial-gradient(circle, #f7931e, transparent)"
            duration="25"
            delay="5"
            style={{
              top: "50%",
              right: "10%",
              width: "400px",
              height: "400px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #fbbf24, transparent)"
            duration="30"
            delay="10"
            style={{
              bottom: "10%",
              left: "20%",
              width: "350px",
              height: "350px",
            }}
          />
        </BackgroundOrbs>

        <Header>
          <Logo>
            <Trophy
              style={{ color: "#ff6b35", width: "2rem", height: "2rem" }}
            />
            <h1>FutyHub</h1>
          </Logo>
          <Nav>
            <a href="/home">Home</a>
            <a href="/leagues">Leagues</a>
            <a href="/teams">Teams</a>
            <a href="/stats">Statistics</a>
            <a href="/about">About</a>
          </Nav>
        </Header>

        <MainContent>
          <BreadcrumbSection>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeft size={20} />
              Back to La Liga
            </BackButton>
          </BreadcrumbSection>

          <HeroSection>
            <LeagueIconLarge>
              <LALIGALogo src="/images/laliga_white.svg" alt="La Liga" />
            </LeagueIconLarge>
            <Title>La Liga Standings</Title>
            <Subtitle>
              The official table of the Spanish First Division. The heart of
              Spanish football in real time.
            </Subtitle>
          </HeroSection>

          <LeaderboardSection>
            <SectionTitle>League Standings</SectionTitle>

            <TableContainer>
              <StandingsTable>
                <TableHeader>
                  <HeaderRow>
                    <th>Pos</th>
                    <th>Club</th>
                    <th>Played</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Loss</th>
                    <th>GF</th>
                    <th>GC</th>
                    <th>DG</th>
                    <th>Points</th>
                    <th>Last 5</th>
                  </HeaderRow>
                </TableHeader>
                <TableBody>
                  {laligaFromDb.map((team, index) => {
                    const position = index + 1;
                    const goalDifference = (team.gf || 0) - (team.ga || 0);
                    return (
                      <TeamRow
                        key={team.id}
                        className={getPositionBadge(position)}
                        delay={index * 0.05}
                      >
                        <PositionCell>
                          <PositionNumber>{position}</PositionNumber>
                          {getPositionIcon(position)}
                        </PositionCell>
                        <TeamCell>
                          <TeamLogo>
                            <TeamLogoImage
                              src={team.logo || "/images/laliga.svg"}
                              alt={team.name}
                            />
                          </TeamLogo>
                          <TeamName>{team.name}</TeamName>
                        </TeamCell>
                        <StatCell>{team.played}</StatCell>
                        <StatCell className="win">{team.wins}</StatCell>
                        <StatCell className="draw">{team.draws}</StatCell>
                        <StatCell className="loss">{team.losses}</StatCell>
                        <StatCell>{team.gf}</StatCell>
                        <StatCell>{team.ga}</StatCell>
                        <StatCell
                          className={
                            goalDifference > 0
                              ? "positive"
                              : goalDifference < 0
                              ? "negative"
                              : ""
                          }
                        >
                          {goalDifference > 0 ? "+" : ""}
                          {goalDifference}
                        </StatCell>
                        <PointsCell>{team.points}</PointsCell>
                        <FormCell>
                          {team.form &&
                            team.form.map((result, idx) => (
                              <FormBadge key={idx} result={result}>
                                {result}
                              </FormBadge>
                            ))}
                        </FormCell>
                      </TeamRow>
                    );
                  })}
                </TableBody>
              </StandingsTable>
            </TableContainer>

            <LegendSection>
              <LegendTitle>Table Legend</LegendTitle>
              <LegendGrid>
                <LegendItem>
                  <LegendColor color="#ecc355" />
                  <span>UEFA Champions League (1-4)</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#f8692c" />
                  <span>UEFA Europa League (5-6)</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#dc2626" />
                  <span>Relegation Zone (18-20)</span>
                </LegendItem>
              </LegendGrid>
            </LegendSection>

            <SpanishStatsSection>
              <SectionTitle>League Statistics</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <span className="number">{laligaFromDb.length}</span>
                  <div className="label">Teams</div>
                </StatCard>
                <StatCard>
                  <span className="number">
                    {laligaFromDb.reduce(
                      (sum, team) => sum + (team.gf || 0),
                      0
                    )}
                  </span>
                  <div className="label">Goals Scored</div>
                </StatCard>
                <StatCard>
                  <span className="number">
                    {Math.round(
                      (laligaFromDb.reduce(
                        (sum, team) => sum + (team.gf || 0),
                        0
                      ) /
                        Math.max(
                          laligaFromDb.reduce(
                            (sum, team) => sum + (team.played || 0),
                            0
                          ),
                          1
                        )) *
                        100
                    ) / 100}
                  </span>
                  <div className="label">Goals per Game</div>
                </StatCard>
                <StatCard>
                  <span className="number">1929</span>
                  <div className="label">Founded</div>
                </StatCard>
              </StatsGrid>
            </SpanishStatsSection>
          </LeaderboardSection>
        </MainContent>
      </Container>
    </>
  );
}

export function LaligaLead() {
  return (
    <Provider store={store}>
      <LaligaLeadInner />
    </Provider>
  );
}

export default LaligaLead;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #2d1b0e, #3d2317, #1a0d00, #2e1a0a);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow: hidden;
`;

const BackgroundOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.color};
  filter: blur(40px);
  opacity: 0.3;
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #2d1b0e, #3d2317, #1a0d00, #2e1a0a);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 107, 53, 0.1);
  border-left: 4px solid #ff6b35;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 2rem;
`;

const LoadingText = styled.div`
  color: #cbd5e1;
  font-size: 1.2rem;
  font-weight: 500;
  font-style: italic;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: #ff6b35;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #ff6b35, #f7931e);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
`;

const BreadcrumbSection = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  color: #cbd5e1;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ff6b35;
    transform: translateX(-3px);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const LeagueIconLarge = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
`;

const LALIGALogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: brightness(1.2) contrast(1.1);
  animation: ${flicker} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-style: italic;
`;

const LeaderboardSection = styled.section`
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 25px 50px rgba(255, 107, 53, 0.1);
`;

const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: rgba(255, 107, 53, 0.15);
`;

const HeaderRow = styled.tr`
  th {
    padding: 1.5rem 1rem;
    text-align: left;
    font-weight: 700;
    color: #ff6b35;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid rgba(255, 107, 53, 0.3);

    &:first-child {
      border-radius: 20px 0 0 0;
    }
    &:last-child {
      border-radius: 0 20px 0 0;
    }
  }
`;

const TableBody = styled.tbody``;

const TeamRow = styled.tr`
  border-bottom: 1px solid rgba(255, 107, 53, 0.08);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out ${(props) => props.delay}s both;

  &:hover {
    background: rgba(255, 107, 53, 0.05);
    transform: translateX(5px);
  }

  &.champions-league {
    border-left: 4px solid #ecc355;
    background: rgba(255, 107, 53, 0.03);
  }

  &.europa-league {
    border-left: 4px solid #f8692c;
    background: rgba(247, 147, 30, 0.03);
  }

  &.relegation {
    border-left: 4px solid #dc2626;
    background: rgba(220, 38, 38, 0.03);
  }
`;

const PositionCell = styled.td`
  padding: 1.2rem 1rem;
  text-align: center;
  width: 80px;
  position: relative;
`;

const PositionNumber = styled.div`
  font-weight: 800;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 0.3rem;
`;

const TeamCell = styled.td`
  padding: 1.2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
`;

const TeamLogo = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 107, 53, 0.1);
`;

const TeamLogoImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const TeamName = styled.div`
  font-weight: 700;
  color: white;
  font-size: 1rem;
`;

const StatCell = styled.td`
  padding: 1.2rem 1rem;
  text-align: center;
  color: #cbd5e1;
  font-weight: 600;
  width: 60px;

  &.win {
    color: #10b981;
  }

  &.draw {
    color: #f59e0b;
  }

  &.loss {
    color: #ef4444;
  }

  &.positive {
    color: #10b981;
  }

  &.negative {
    color: #ef4444;
  }
`;

const PointsCell = styled.td`
  padding: 1.2rem 1rem;
  text-align: center;
  font-weight: 900;
  font-size: 1.1rem;
  color: #ff6b35;
  width: 80px;
`;

const FormCell = styled.td`
  padding: 1.2rem 1rem;
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  width: 140px;
`;

const FormBadge = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  background: ${(props) => {
    switch (props.result) {
      case "W":
        return "#10b981";
      case "D":
        return "#f59e0b";
      case "L":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
`;

const LegendSection = styled.div`
  background: rgba(255, 107, 53, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const LegendTitle = styled.h3`
  color: white;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #cbd5e1;
  font-weight: 500;
`;

const LegendColor = styled.div`
  width: 4px;
  height: 20px;
  background: ${(props) => props.color};
  border-radius: 2px;
`;

const SpanishStatsSection = styled.section`
  margin: 4rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  text-align: center;
  background: rgba(255, 107, 53, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 107, 53, 0.08);
  }

  .number {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }

  .label {
    color: #cbd5e1;
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: ${flicker} 2s ease-in-out infinite;
`;
