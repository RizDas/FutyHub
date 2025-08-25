import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  User,
  Award,
  Target,
  Star,
  Briefcase,
  ChevronRight,
  Crown,
  TrendingUp,
} from "lucide-react";
import { Provider, useDispatch } from "react-redux";
import db from "../firebase";
import { setTeams } from "../features/teams/teamslice";
import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "../features/teams/teamslice";

const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
});

function ManagersInner() {
  const dispatch = useDispatch();
  const [managersFromDb, setManagersFromDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("all");

  const effectiveManagers = managersFromDb;

  useEffect(() => {
    if (!db || typeof db.collection !== "function") {
      console.warn(" 'db.collection' not available!");
      setLoading(false);
      return;
    }

    const unsubscribe = db.collection("managers").onSnapshot(
      (snapshot) => {
        try {
          const fetchedManagers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (fetchedManagers.length > 0) {
            const normalized = fetchedManagers.map((manager, index) => ({
              id: manager.id ?? index + 1,
              name: manager.name ?? `Manager ${index + 1}`,
              currentTeam: manager.currentTeam ?? "Free Agent",
              nationality: manager.nationality ?? "Unknown",
              age: manager.age ?? Math.floor(Math.random() * 30) + 35,
              experience:
                manager.experience ?? Math.floor(Math.random() * 20) + 1,
              trophies: manager.trophies ?? Math.floor(Math.random() * 10),
              league: manager.league ?? "Unknown",
              photo: manager.photo ?? "/images/manager_default.svg",
              previousTeams: manager.previousTeams ?? [],
              specialization: manager.specialization ?? "Tactical",
              coachingStyle: manager.coachingStyle ?? "Attacking",
              contractUntil: manager.contractUntil ?? "2025",
            }));

            setManagersFromDb(normalized);
            dispatch(setTeams({ managers: normalized }));
          } else {
            setManagersFromDb([]);
          }
        } catch (err) {
          console.error("Error parsing managers snapshot:", err);
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

  const filteredManagers = effectiveManagers.filter((manager) => {
    const term = searchTerm.trim().toLowerCase();
    const leagueFilter =
      selectedLeague === "all" ||
      manager.league?.toLowerCase() === selectedLeague;

    if (!term && leagueFilter) return true;
    if (!leagueFilter) return false;

    const name = (manager.name || "").toString().toLowerCase();
    const team = (manager.currentTeam || "").toString().toLowerCase();
    const nationality = (manager.nationality || "").toString().toLowerCase();
    const style = (manager.coachingStyle || "").toString().toLowerCase();

    return (
      name.includes(term) ||
      team.includes(term) ||
      nationality.includes(term) ||
      style.includes(term)
    );
  });

  const leagues = ["all", "epl", "laliga", "seriea", "bundesliga", "ligue1"];

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#1a1a2e",
          height: "100vh",
          color: "#ffffff",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <LoadingSpinner />
        <span style={{ marginTop: "20px" }}>Loading Managers...</span>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb
            color="radial-gradient(circle, #8b5cf6, transparent)"
            duration="20"
            delay="0"
            style={{ top: "10%", left: "10%", width: "300px", height: "300px" }}
          />
          <Orb
            color="radial-gradient(circle, #06b6d4, transparent)"
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
            color="radial-gradient(circle, #10b981, transparent)"
            duration="22"
            delay="7"
            style={{
              top: "70%",
              left: "50%",
              width: "350px",
              height: "350px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #f59e0b, transparent)"
            duration="28"
            delay="12"
            style={{
              bottom: "20%",
              right: "30%",
              width: "320px",
              height: "320px",
            }}
          />
        </BackgroundOrbs>

        <Header>
          <Logo>
            <Trophy
              style={{ color: "#8b5cf6", width: "2rem", height: "2rem" }}
            />
            <h1>FutyHub</h1>
          </Logo>
          <Nav>
            <a href="/home">Home</a>
            <a href="/leagues">Leagues</a>
            <a href="/teams">Teams</a>
            <a href="/managers" className="active">
              Managers
            </a>
            <a href="/stats">Statistics</a>
            <a href="/about">About</a>
          </Nav>
        </Header>

        <MainContent>
          <BreadcrumbSection>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeft size={20} />
              Back
            </BackButton>
          </BreadcrumbSection>

          <HeroSection>
            <LeagueIconLarge>
              <User size={120} color="#8b5cf6" />
            </LeagueIconLarge>
            <Title>
              <h1>MANAGERS</h1>
              <Subtitle>TACTICAL MASTERMINDS</Subtitle>
            </Title>
            <LeagueInfo>
              <InfoItem>
                <Briefcase size={20} />
                <span>Professional Coaches</span>
              </InfoItem>
              <InfoItem>
                <Trophy size={20} />
                <span>Trophy Winners</span>
              </InfoItem>
              <InfoItem>
                <Target size={20} />
                <span>Tactical Experts</span>
              </InfoItem>
            </LeagueInfo>
            <Description>
              Meet the strategic minds behind the world's greatest football
              teams. These are the tacticians, motivators, and leaders who shape
              the beautiful game.
            </Description>
          </HeroSection>

          <FilterSection>
            <SearchInput
              type="text"
              placeholder="Search managers by name, team, nationality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <LeagueFilter>
              {leagues.map((league) => (
                <FilterButton
                  key={league}
                  active={selectedLeague === league}
                  onClick={() => setSelectedLeague(league)}
                >
                  {league === "all" ? "All Leagues" : league.toUpperCase()}
                </FilterButton>
              ))}
            </LeagueFilter>
          </FilterSection>

          <ManagersSection>
            <SectionTitle>Football Managers</SectionTitle>
            <ManagersGrid>
              {filteredManagers.map((manager, index) => (
                <ManagerCard
                  key={manager.id ?? `${manager.name}-${index}`}
                  delay={index * 0.05}
                >
                  <CardHeader>
                    <ManagerProfile>
                      <PhotoWrapper>
                        <PhotoRing>
                          <PhotoContainer>
                            {typeof manager.photo === "string" ? (
                              <ManagerPhoto
                                src={
                                  manager.photo || "/images/manager_default.svg"
                                }
                                alt={manager.name}
                              />
                            ) : React.isValidElement(manager.photo) ? (
                              manager.photo
                            ) : (
                              <User size={48} color="rgba(139, 92, 246, 0.6)" />
                            )}
                          </PhotoContainer>
                        </PhotoRing>
                      </PhotoWrapper>

                      <ManagerInfo>
                        <ManagerName>{manager.name}</ManagerName>
                        <TeamName>
                          <Briefcase size={18} />
                          {manager.currentTeam}
                        </TeamName>

                        <PersonalDetails>
                          <DetailItem>
                            <MapPin />
                            <span>{manager.nationality}</span>
                          </DetailItem>
                          <DetailItem>
                            <Calendar />
                            <span>{manager.age} years</span>
                          </DetailItem>
                          <TrophyIndicator>
                            <Trophy />
                            <span>{manager.trophies || 0}</span>
                          </TrophyIndicator>
                        </PersonalDetails>
                      </ManagerInfo>
                    </ManagerProfile>
                  </CardHeader>

                  <CardBody>
                    <ManStatsGrid>
                      <ManStatCard>
                        <StatLabel>Experience</StatLabel>
                        <StatValue>{manager.experience} years</StatValue>
                      </ManStatCard>
                      <ManStatCard>
                        <StatLabel>Style</StatLabel>
                        <StatValue>{manager.coachingStyle}</StatValue>
                      </ManStatCard>
                      <ManStatCard>
                        <StatLabel>Formation</StatLabel>
                        <StatValue>{manager.formation || "4-3-3"}</StatValue>
                      </ManStatCard>
                      <ManStatCard>
                        <StatLabel>Contract</StatLabel>
                        <StatValue>{manager.contractUntil}</StatValue>
                      </ManStatCard>
                    </ManStatsGrid>
                  </CardBody>
                </ManagerCard>
              ))}
            </ManagersGrid>
          </ManagersSection>

          <StatsSection>
            <SectionTitle>Manager Statistics</SectionTitle>
            <StatsGrid>
              <StatCard>
                <span className="number">{effectiveManagers.length}</span>
                <div className="label">Total Managers</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {Math.round(
                    effectiveManagers.reduce(
                      (sum, manager) => sum + (manager.age || 0),
                      0
                    ) / effectiveManagers.length
                  ) || 0}
                </span>
                <div className="label">Average Age</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {effectiveManagers.reduce(
                    (sum, manager) => sum + (manager.trophies || 0),
                    0
                  )}
                </span>
                <div className="label">Total Trophies</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {Math.round(
                    effectiveManagers.reduce(
                      (sum, manager) => sum + (manager.experience || 0),
                      0
                    ) / effectiveManagers.length
                  ) || 0}
                </span>
                <div className="label">Avg Experience</div>
              </StatCard>
            </StatsGrid>
          </StatsSection>
        </MainContent>
      </Container>
    </>
  );
}

export function Managers() {
  return (
    <Provider store={store}>
      <ManagersInner />
    </Provider>
  );
}

export default Managers;

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

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  }
  50% { 
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f172a, #2d1b69);
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

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid #333;
  border-top: 3px solid #8b5cf6;
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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
      color: #8b5cf6;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #8b5cf6, #06b6d4);
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }

    &.active {
      color: #8b5cf6;
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #cbd5e1;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #8b5cf6;
    transform: translateX(-3px);
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
    rgba(139, 92, 246, 0.2),
    rgba(139, 92, 246, 0.05)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 3rem;
  animation: ${glow} 3s ease-in-out infinite;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(139, 92, 246, 0.3);
`;

const Title = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 4rem;
    font-weight: 900;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  color: #cbd5e1;
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
  color: #cbd5e1;
  font-size: 1.1rem;
  font-weight: 500;

  svg {
    color: #8b5cf6;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #cbd5e1;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterSection = styled.div`
  margin: 4rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
  display: block;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
  }
`;

const LeagueFilter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
      : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  border: 2px solid
    ${(props) =>
      props.active ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
        : "rgba(255, 255, 255, 0.15)"};
    transform: translateY(-2px);
  }
`;

const ManagersSection = styled.section`
  margin: 5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`;

const ManagersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ManagerCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out ${(props) => props.delay}s both;
  height: 430px;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: rgba(139, 92, 246, 0.3);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08),
      rgba(139, 92, 246, 0.03)
    );
    box-shadow: 0 25px 70px rgba(139, 92, 246, 0.2),
      0 0 0 1px rgba(139, 92, 246, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.8),
      rgba(6, 182, 212, 0.8),
      transparent
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  padding: 2.5rem 2.5rem 1.5rem;
  position: relative;
`;

const TrophyIndicator = styled.div`
  background: rgba(245, 158, 11, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 14px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  margin-left: 40px;

  svg {
    color: #f59e0b;
    width: 14px;
    height: 14px;
  }

  span {
    color: #f59e0b;
    font-weight: 500;
    font-size: 0.8rem;
  }
`;

const ManagerProfile = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 0;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  flex-shrink: 0;
`;

const PhotoRing = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #8b5cf6);
  padding: 2px;
`;

const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ManagerPhoto = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 50%;
`;

const ManagerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ManagerName = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

const TeamName = styled.div`
  color: #8b5cf6;
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  svg {
    opacity: 0.7;
    width: 16px;
    height: 16px;
  }
`;

const PersonalDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0;
  margin-left: -100px;
  padding-top: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(203, 213, 225, 0.8);
  font-size: 0.85rem;
  font-weight: 400;

  svg {
    color: rgba(139, 92, 246, 0.7);
    width: 14px;
    height: 14px;
  }
`;

const CardBody = styled.div`
  padding: 0 2rem 2rem;
`;

const ManStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0;
`;

const ManStatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.2rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.div`
  color: rgba(148, 163, 184, 0.8);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.6rem;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: -0.01em;
`;

const MatchRecord = styled.div`
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.04),
    rgba(6, 182, 212, 0.02)
  );
  border: 1px solid rgba(139, 92, 246, 0.1);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  text-align: center;
`;

const RecordTitle = styled.h4`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
`;

const RecordStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const RecordStat = styled.div`
  text-align: center;
`;

const RecordValue = styled.div`
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  &.wins {
    color: #10b981;
  }
  &.draws {
    color: #f59e0b;
  }
  &.losses {
    color: #ef4444;
  }
`;

const RecordLabel = styled.div`
  color: rgba(148, 163, 184, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WinRate = styled.div`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  color: #8b5cf6;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
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
    border-color: rgba(139, 92, 246, 0.3);
  }

  .number {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
