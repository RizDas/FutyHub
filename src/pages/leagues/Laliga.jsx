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

function LaligaInner() {
  const dispatch = useDispatch();
  const [laligaFromDb, setLaligaFromDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const effectiveTeams = laligaFromDb;

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
              city: team.city ?? team.town ?? "Unknown",
              founded: team.founded ?? "—",
              stadium: team.stadium ?? "—",
              players: team.players ?? Math.floor(Math.random() * 10) + 20,
              logo: team.logo ?? "/images/laliga.svg",
              colors: team.colors ?? "#ff6b35",
            }));

            setLaligaFromDb(normalized);
            dispatch(setTeams({ laliga: normalized }));
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

  const filteredTeams = effectiveTeams.filter((team) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const name = (team.name || "").toString().toLowerCase();
    const city = (team.city || "").toString().toLowerCase();
    return name.includes(term) || city.includes(term);
  });

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#2e1a0a",
          height: "57vh",
          color: "#ffffff",
          fontSize: "50px",
          paddingTop: "30vh",
        }}
      >
        <span>Loading...</span>
      </div>
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
              Back to Leagues
            </BackButton>
          </BreadcrumbSection>

          <HeroSection>
            <LeagueIconLarge>
              <LALIGALogo src="/images/laliga_white.svg" alt="LALIGA" />
            </LeagueIconLarge>
            <Title>
              <LALIGAText src="/images/laliga_text_white.svg" alt="La Liga" />
            </Title>
            <LeagueInfo>
              <InfoItem>
                <MapPin size={20} />
                <span>Spain</span>
              </InfoItem>
              <InfoItem>
                <Calendar size={20} />
                <span>Founded 1929</span>
              </InfoItem>
              <InfoItem>
                <Users size={20} />
                <span>{effectiveTeams.length} Teams</span>
              </InfoItem>
              <InfoItem>
                <Trophy size={20} />
                <span>Season 2024-25</span>
              </InfoItem>
            </LeagueInfo>
            <Subtitle>
              The heart of Spanish football. Home to legendary clubs, passionate
              fans, and some of the world's greatest players and rivalries.
            </Subtitle>
          </HeroSection>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Search teams by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchSection>

          <TeamsSection>
            <SectionTitle>All Teams</SectionTitle>
            <TeamsGrid>
              {filteredTeams.map((team, index) => (
                <TeamCard
                  key={team.id ?? `${team.name}-${index}`}
                  delay={index * 0.1}
                >
                  <TeamLogo>
                    {typeof team.logo === "string" ? (
                      <TeamLogoImage
                        src={team.logo || "/images/laliga.svg"}
                        alt={team.name}
                      />
                    ) : React.isValidElement(team.logo) ? (
                      team.logo
                    ) : typeof team.logo === "function" ? (
                      React.createElement(team.logo, { size: 40 })
                    ) : (
                      <TeamLogoImage src="/images/laliga.jpg" alt={team.name} />
                    )}
                  </TeamLogo>
                  <TeamInfo>
                    <TeamName>{team.name}</TeamName>
                    <TeamMeta>
                      <MetaItem>
                        <MapPin size={14} />
                        <span>{team.city}</span>
                      </MetaItem>
                      <MetaItem>
                        <Calendar size={14} />
                        <span>Founded {team.founded}</span>
                      </MetaItem>
                      <MetaItem>
                        <Users size={14} />
                        <span>{team.players} players</span>
                      </MetaItem>
                    </TeamMeta>
                    <Stadium>{team.stadium}</Stadium>
                  </TeamInfo>
                </TeamCard>
              ))}
            </TeamsGrid>
          </TeamsSection>

          <StatsSection>
            <SectionTitle>League Overview</SectionTitle>
            <StatsGrid>
              <StatCard>
                <span className="number">{effectiveTeams.length}</span>
                <div className="label">Total Teams</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {effectiveTeams.reduce(
                    (sum, team) => sum + (team.players || 0),
                    0
                  )}
                </span>
                <div className="label">Total Players</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {
                    new Set(
                      effectiveTeams.map((team) =>
                        (team.city || "").toLowerCase()
                      )
                    ).size
                  }
                </span>
                <div className="label">Cities</div>
              </StatCard>
              <StatCard>
                <span className="number">1992</span>
                <div className="label">Founded</div>
              </StatCard>
            </StatsGrid>
          </StatsSection>
        </MainContent>
      </Container>
    </>
  );
}

export function Laliga() {
  return (
    <Provider store={store}>
      <LaligaInner />
    </Provider>
  );
}

export default Laliga;

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
    font-weight: 800;
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

    &:hover::after,
    &.active::after {
      width: 100%;
    }

    &.active {
      color: #ff6b35;
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
  width: 220px;
  height: 220px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  padding: 1rem;
  margin-bottom: 40px;
`;

const LALIGALogo = styled.img`
  width: 240px;
  height: 240px;
  object-fit: contain;
  filter: brightness(1.2) contrast(1.1);
`;

const Title = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LALIGAText = styled.img`
  height: 750px;
  object-fit: contain;
  filter: brightness(1.2) contrast(1.1);
  color: white;
`;

const LeagueInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #cbd5e1;
  font-size: 1.1rem;
  font-weight: 500;

  svg {
    color: #ff6b35;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  margin: 3rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: block;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #ff6b35;
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  }
`;

const TeamsSection = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: white;
  margin-bottom: 3rem;

  .accent {
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out ${(props) => props.delay}s both;

  &:hover {
    transform: translateY(-10px);
    border-color: #ff6b35;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b35, #f7931e);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const TeamRank = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 245, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b35;
  font-weight: 700;
  font-size: 0.9rem;
`;

const TeamLogo = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: rgba(225, 225, 225, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b35;
  margin-bottom: 1.5rem;
  padding: 0.8rem;
`;

const TeamLogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.05);
`;

const TeamInfo = styled.div`
  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.8rem;
  }
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const TeamMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #94a3b8;
  font-size: 0.9rem;

  span {
    font-weight: 500;
  }
`;

const Stadium = styled.div`
  color: #cbd5e1;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TeamStats = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;

  .label {
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }

  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ff6b35;
  }
`;

const StatsSection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
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
