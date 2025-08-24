import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  ChevronLeft,
  Shield,
  Globe,
  Crown,
  Zap,
  ArrowLeft,
  Star,
  Flag,
} from "lucide-react";
import { Provider, useDispatch } from "react-redux";
import db from "../../firebase";
import { setTeams } from "../../features/teams/teamslice";
import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../../features/teams/teamslice";

const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
});

function InternationalInner() {
  const dispatch = useDispatch();
  const [internationalFromDb, setInternationalFromDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const effectiveTeams = internationalFromDb;

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
                t.league === "international" ||
                (t.league && t.league.toLowerCase() === "international")
            );

          if (fetchedTeams.length > 0) {
            const normalized = fetchedTeams.map((team, index) => ({
              id: team.id ?? index + 1,
              name: team.name ?? team.clubName ?? `Team ${index + 1}`,
              country: team.country ?? team.city ?? "Unknown",
              founded: team.founded ?? "—",
              stadium: team.stadium ?? "—",
              players: team.players ?? Math.floor(Math.random() * 10) + 20,
              logo: team.logo ?? "/images/international.svg",
              colors: team.colors ?? "#1a1a1a",
              worldRanking:
                team.worldRanking ?? Math.floor(Math.random() * 50) + 1,
              continent: team.continent ?? "Unknown",
            }));

            setInternationalFromDb(normalized);
            dispatch(setTeams({ international: normalized }));
          } else {
            setInternationalFromDb([]);
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

  const filteredTeams = effectiveTeams.filter((team) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const name = (team.name || "").toString().toLowerCase();
    const country = (team.country || "").toString().toLowerCase();
    const continent = (team.continent || "").toString().toLowerCase();
    return (
      name.includes(term) || country.includes(term) || continent.includes(term)
    );
  });

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#000000",
          height: "100vh",
          color: "#ffffff",
          fontSize: "50px",
          paddingTop: "45vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <LoadingSpinner />
        <span style={{ marginTop: "20px", fontSize: "24px" }}>
          Loading International Teams...
        </span>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Multi-layered Flowing Grid System */}
        <FlowingGrid />
        <WavyGrid />
        <PulsingGrid />
        <Header>
          <Logo>
            <Globe
              style={{ color: "#ffffff", width: "2rem", height: "2rem" }}
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
              Back to Leagues
            </BackButton>
          </BreadcrumbSection>

          <HeroSection>
            <LeagueIconLarge>
              <Globe size={120} color="#ffffff" />
            </LeagueIconLarge>
            <Title>
              <h1>INTERNATIONAL</h1>
              <Subtitle>NATIONAL TEAMS</Subtitle>
            </Title>
            <LeagueInfo>
              <InfoItem>
                <Globe size={20} />
                <span>Worldwide</span>
              </InfoItem>
              <InfoItem>
                <Flag size={20} />
                <span>National Teams</span>
              </InfoItem>
              <InfoItem>
                <Users size={20} />
                <span>{effectiveTeams.length} Countries</span>
              </InfoItem>
              <InfoItem>
                <Trophy size={20} />
                <span>FIFA Rankings</span>
              </InfoItem>
            </LeagueInfo>
            <Description>
              The pinnacle of international football. Where nations compete for
              glory, pride, and the honor of representing their homeland on the
              world stage.
            </Description>
          </HeroSection>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Search by country, team name, or continent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchSection>

          <TeamsSection>
            <SectionTitle>National Teams</SectionTitle>
            <TeamsGrid>
              {filteredTeams.map((team, index) => (
                <TeamCard
                  key={team.id ?? `${team.name}-${index}`}
                  delay={index * 0.05}
                >
                  <TeamRank>#{team.worldRanking}</TeamRank>
                  <TeamLogo>
                    {typeof team.logo === "string" ? (
                      <TeamLogoImage
                        src={team.logo || "/images/international.svg"}
                        alt={team.name}
                      />
                    ) : React.isValidElement(team.logo) ? (
                      team.logo
                    ) : typeof team.logo === "function" ? (
                      React.createElement(team.logo, { size: 40 })
                    ) : (
                      <Flag size={40} color="#ffffff" />
                    )}
                  </TeamLogo>
                  <TeamInfo>
                    <TeamName>{team.name}</TeamName>
                    <TeamMeta>
                      <MetaItem>
                        <MapPin size={14} />
                        <span>{team.country}</span>
                      </MetaItem>
                      <MetaItem>
                        <Globe size={14} />
                        <span>{team.continent}</span>
                      </MetaItem>
                      <MetaItem>
                        <Users size={14} />
                        <span>{team.players} players</span>
                      </MetaItem>
                    </TeamMeta>
                    <Stadium>{team.stadium || "Various Stadiums"}</Stadium>
                  </TeamInfo>
                </TeamCard>
              ))}
            </TeamsGrid>
          </TeamsSection>

          <StatsSection>
            <SectionTitle>Global Overview</SectionTitle>
            <StatsGrid>
              <StatCard>
                <div className="stat-icon">
                  <Flag size={30} />
                </div>
                <span className="number">{effectiveTeams.length}</span>
                <div className="label">National Teams</div>
              </StatCard>
              <StatCard>
                <div className="stat-icon">
                  <Users size={30} />
                </div>
                <span className="number">
                  {effectiveTeams.reduce(
                    (sum, team) => sum + (team.players || 0),
                    0
                  )}
                </span>
                <div className="label">Total Players</div>
              </StatCard>
              <StatCard>
                <div className="stat-icon">
                  <Globe size={30} />
                </div>
                <span className="number">6</span>
                <div className="label">Continents</div>
              </StatCard>
              <StatCard>
                <div className="stat-icon">
                  <Trophy size={30} />
                </div>
                <span className="number">32</span>
                <div className="label">World Cup Spots</div>
              </StatCard>
            </StatsGrid>
          </StatsSection>
        </MainContent>
      </Container>
    </>
  );
}

export function International() {
  return (
    <Provider store={store}>
      <InternationalInner />
    </Provider>
  );
}

export default International;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    background: #000000;
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const gridFlow = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateX(25px) translateY(-15px) rotate(2deg);
    opacity: 0.8;
  }
  50% {
    transform: translateX(-10px) translateY(20px) rotate(-1deg);
    opacity: 0.4;
  }
  75% {
    transform: translateX(35px) translateY(10px) rotate(3deg);
    opacity: 0.7;
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.6;
  }
`;

const gridWave = keyframes`
  0%, 100% {
    transform: skewX(0deg) scale(1);
    background-position: 0% 0%;
  }
  25% {
    transform: skewX(2deg) scale(1.02);
    background-position: 25% 25%;
  }
  50% {
    transform: skewX(0deg) scale(0.98);
    background-position: 50% 50%;
  }
  75% {
    transform: skewX(-2deg) scale(1.01);
    background-position: 75% 25%;
  }
`;

const gridPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    filter: brightness(1);
  }
  50% {
    opacity: 0.6;
    filter: brightness(1.2);
  }
`;

const gridShift = keyframes`
  0% {
    background-position: 0px 0px, 0px 0px;
  }
  100% {
    background-position: 40px 40px, 80px 80px;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%);
  position: relative;
  overflow: hidden;
`;

const FlowingGrid = styled.div`
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.08) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px, 40px 40px, 80px 80px, 80px 80px;
  animation: ${gridShift} 20s linear infinite,
    ${gridFlow} 15s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
  filter: blur(0.5px);
`;

const WavyGrid = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.06) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: ${gridWave} 12s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
  opacity: 0.7;
`;

const PulsingGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle at 20px 20px,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 60px 60px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    );
  background-size: 120px 120px, 200px 200px;
  animation: ${gridPulse} 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid #333;
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: #cccccc;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 1rem;
    border-radius: 8px;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #ffffff, #cccccc);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 80%;
    }
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const BreadcrumbSection = styled.div`
  margin-bottom: 2rem;
  animation: ${slideInLeft} 0.8s ease-out;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateX(-5px);
    box-shadow: 0 5px 20px rgba(255, 255, 255, 0.1);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const LeagueIconLarge = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 3rem;
  animation: ${glow} 3s ease-in-out infinite;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 4rem;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  color: #cccccc;
  letter-spacing: 0.3em;
  text-transform: uppercase;
`;

const LeagueInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }

  svg {
    color: #ffffff;
  }
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: #cccccc;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 300;
`;

const SearchSection = styled.div`
  margin: 4rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  transition: all 0.4s ease;

  &::placeholder {
    color: #999999;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
  }
`;

const TeamsSection = styled.section`
  margin: 5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  color: #ffffff;
  margin-bottom: 4rem;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
`;

const TeamCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out ${(props) => props.delay}s both;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.3);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.05)
    );
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffffff, #cccccc);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const TeamRank = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TeamLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TeamLogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: brightness(1.2) contrast(1.1);
`;

const TeamInfo = styled.div``;

const TeamName = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const TeamMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #cccccc;
  font-size: 1rem;
  font-weight: 500;

  span {
    font-weight: 600;
  }
`;

const Stadium = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
`;

const StatsSection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const StatCard = styled.div`
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2rem;
  transition: all 0.4s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 50px rgba(255, 255, 255, 0.1);
  }

  .stat-icon {
    margin-bottom: 1rem;
    color: #ffffff;
    opacity: 0.8;
  }

  .number {
    font-size: 3rem;
    font-weight: 900;
    color: #ffffff;
    display: block;
    margin: 1rem 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .label {
    color: #cccccc;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;
