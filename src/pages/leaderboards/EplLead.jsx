import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Award,
  Target,
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

function EplLeadInner() {
  const dispatch = useDispatch();
  const [eplFromDb, setEplFromDb] = useState([]);
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
                t.league === "epl" ||
                (t.league && t.league.toLowerCase() === "epl")
            );

          if (fetchedTeams.length > 0) {
            const normalized = fetchedTeams.map((team, index) => ({
              id: team.id ?? index + 1,
              name: team.name ?? team.clubName ?? `Team ${index + 1}`,
              city: team.city ?? team.town ?? "Unknown",
              founded: team.founded ?? "—",
              stadium: team.stadium ?? "—",
              players: team.players ?? Math.floor(Math.random() * 10) + 20,
              logo: team.logo ?? "/images/epl.svg",
              colors: team.colors ?? "#00f5ff",
              points: team.points ?? Math.floor(Math.random() * 30) + 40, // Better random range for demo
            }));

            setEplFromDb(normalized);
            dispatch(setTeams({ epl: normalized }));
          } else {
            setEplFromDb([]);
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

  // Sort teams by points for additional stats
  const sortedTeams = [...eplFromDb].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );
  const topTeam = sortedTeams[0];
  const avgPoints =
    eplFromDb.length > 0
      ? Math.round(
          eplFromDb.reduce((sum, team) => sum + (team.points || 0), 0) /
            eplFromDb.length
        )
      : 0;

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingContent>
          <LoadingSpinner />
          <LoadingText>Loading EPL Leaderboard...</LoadingText>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb
            color="radial-gradient(circle, #00f5ff, transparent)"
            duration="20"
            delay="0"
            style={{ top: "15%", left: "5%", width: "400px", height: "400px" }}
          />
          <Orb
            color="radial-gradient(circle, #0084ff, transparent)"
            duration="25"
            delay="5"
            style={{
              top: "60%",
              right: "5%",
              width: "500px",
              height: "500px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #38bdf8, transparent)"
            duration="30"
            delay="10"
            style={{
              bottom: "5%",
              left: "15%",
              width: "350px",
              height: "350px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #0ea5e9, transparent)"
            duration="35"
            delay="15"
            style={{
              top: "30%",
              left: "50%",
              width: "300px",
              height: "300px",
            }}
          />
        </BackgroundOrbs>

        <Header>
          <Logo>
            <Trophy
              style={{ color: "#00f5ff", width: "2.5rem", height: "2.5rem" }}
            />
            <h1>FutyHub</h1>
          </Logo>
          <Nav>
            <a href="/home">Home</a>
            <a href="/leagues">Leagues</a>
            <a href="/teams">Teams</a>
            <a href="/epl">EPL Teams</a>
            <a href="/stats">Statistics</a>
          </Nav>
        </Header>

        <MainContent>
          <BreadcrumbSection>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeft size={20} />
              Back to EPL
            </BackButton>
          </BreadcrumbSection>

          <HeroSection>
            <HeroContent>
              <LeagueIconLarge>
                <EPLLogo src="/images/epl_white.svg" alt="EPL" />
              </LeagueIconLarge>
              <HeroText>
                <MainTitle>
                  <Crown size={40} style={{ color: "#FFD700" }} />
                  Premier League
                  <br />
                  <span className="highlight">Leaderboard</span>
                </MainTitle>
                <HeroSubtitle>
                  Live standings • Season 2024-25 • Updated in real-time
                </HeroSubtitle>
              </HeroText>
            </HeroContent>

            <StatsHighlight>
              <HighlightCard>
                <CardIcon>
                  <Crown size={24} />
                </CardIcon>
                <CardContent>
                  <CardNumber>{topTeam?.points || 0}</CardNumber>
                  <CardLabel>Leader Points</CardLabel>
                  <CardSubtext>{topTeam?.name || "No teams"}</CardSubtext>
                </CardContent>
              </HighlightCard>

              <HighlightCard>
                <CardIcon>
                  <Target size={24} />
                </CardIcon>
                <CardContent>
                  <CardNumber>{avgPoints}</CardNumber>
                  <CardLabel>Average Points</CardLabel>
                  <CardSubtext>Across all teams</CardSubtext>
                </CardContent>
              </HighlightCard>

              <HighlightCard>
                <CardIcon>
                  <Users size={24} />
                </CardIcon>
                <CardContent>
                  <CardNumber>{eplFromDb.length}</CardNumber>
                  <CardLabel>Total Teams</CardLabel>
                  <CardSubtext>Premier League</CardSubtext>
                </CardContent>
              </HighlightCard>

              <HighlightCard>
                <CardIcon>
                  <Award size={24} />
                </CardIcon>
                <CardContent>
                  <CardNumber>38</CardNumber>
                  <CardLabel>Match Days</CardLabel>
                  <CardSubtext>Season format</CardSubtext>
                </CardContent>
              </HighlightCard>
            </StatsHighlight>
          </HeroSection>

          <LeaderboardSection>
            <SectionHeader>
              <SectionTitle>
                <Trophy size={32} />
                Current Standings
              </SectionTitle>
              <SectionSubtitle>
                Teams ranked by total points earned this season
              </SectionSubtitle>
            </SectionHeader>

            <LeaderboardWrapper>
              <Leaderboard teams={eplFromDb} />
            </LeaderboardWrapper>
          </LeaderboardSection>

          <InsightsSection>
            <SectionTitle>Season Insights</SectionTitle>
            <InsightsGrid>
              <InsightCard>
                <InsightIcon>
                  <TrendingUp size={28} />
                </InsightIcon>
                <InsightContent>
                  <h4>Title Race</h4>
                  <p>
                    {sortedTeams.length > 1
                      ? `${sortedTeams[0]?.name} leads by ${
                          (sortedTeams[0]?.points || 0) -
                          (sortedTeams[1]?.points || 0)
                        } points`
                      : "Season just getting started!"}
                  </p>
                </InsightContent>
              </InsightCard>

              <InsightCard>
                <InsightIcon>
                  <Medal size={28} />
                </InsightIcon>
                <InsightContent>
                  <h4>Top 4 Race</h4>
                  <p>
                    Champions League spots are highly competitive with tight
                    point margins
                  </p>
                </InsightContent>
              </InsightCard>

              <InsightCard>
                <InsightIcon>
                  <Star size={28} />
                </InsightIcon>
                <InsightContent>
                  <h4>Season Progress</h4>
                  <p>
                    Every point matters in the world's most competitive league
                  </p>
                </InsightContent>
              </InsightCard>
            </InsightsGrid>
          </InsightsSection>
        </MainContent>
      </Container>
    </>
  );
}

export function EplLead() {
  return (
    <Provider store={store}>
      <EplLeadInner />
    </Provider>
  );
}

export default EplLead;

// Styled Components
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

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #0a0e1a, #1a1a2e, #16213e, #0f172a);
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
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
  filter: blur(60px);
  opacity: 0.4;
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #00f5ff, #0084ff, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  a {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;

    &:hover {
      color: #00f5ff;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00f5ff, #0084ff);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;

    a {
      font-size: 0.9rem;
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

const LoadingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #0a0e1a, #1a1a2e, #16213e, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: white;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(0, 245, 255, 0.1);
  border-top: 4px solid #00f5ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 2rem;
`;

const LoadingText = styled.p`
  font-size: 1.3rem;
  color: #cbd5e1;
  font-weight: 500;
`;

const BreadcrumbSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 245, 255, 0.3);
  border-radius: 15px;
  padding: 1rem 2rem;
  color: #cbd5e1;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: #00f5ff;
    color: #00f5ff;
    transform: translateX(-5px);
    box-shadow: 0 10px 25px rgba(0, 245, 255, 0.2);
  }
`;

const HeroSection = styled.section`
  margin-bottom: 5rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeagueIconLarge = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const EPLLogo = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  filter: brightness(1.3) contrast(1.2)
    drop-shadow(0 0 20px rgba(0, 245, 255, 0.3));
`;

const HeroText = styled.div`
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .highlight {
    background: linear-gradient(135deg, #00f5ff, #0084ff, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;

    .highlight {
      font-size: 3rem;
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: #94a3b8;
  font-weight: 500;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StatsHighlight = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const HighlightCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: #00f5ff;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px rgba(0, 245, 255, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00f5ff, #0084ff, #38bdf8);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  color: #00f5ff;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const CardContent = styled.div``;

const CardNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00f5ff, #0084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const CardLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.3rem;
`;

const CardSubtext = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
`;

const LeaderboardSection = styled.section`
  margin: 6rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    color: #00f5ff;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  font-weight: 500;
`;

const LeaderboardWrapper = styled.div`
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const InsightsSection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const InsightCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 245, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const InsightIcon = styled.div`
  color: #00f5ff;
  margin-bottom: 1.5rem;
`;

const InsightContent = styled.div`
  h4 {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
    font-weight: 500;
  }
`;
