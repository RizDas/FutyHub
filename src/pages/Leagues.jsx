import React from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  Shield,
  Globe,
  Crown,
  Zap,
  Mountain,
  Flame,
} from "lucide-react";

export default function Leagues() {
  const leagues = [
    {
      id: 1,
      name: "Premier League",
      country: "England",
      season: "2024-25",
      teams: 20,
      founded: 1992,
      icon: "/images/epl_white.svg",
      gradient: "linear-gradient(135deg, #00f5ff, #0084ff)",
      bgColor: "rgba(0, 245, 255, 0.1)",
      borderColor: "#00f5ff",
      route: "epl",
    },
    {
      id: 2,
      name: "La Liga",
      country: "Spain",
      season: "2024-25",
      teams: 20,
      founded: 1929,
      icon: "/images/laliga_white.svg",
      gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
      bgColor: "rgba(255, 107, 53, 0.1)",
      borderColor: "#ff6b35",
      route: "laliga",
    },
    {
      id: 3,
      name: "Serie A",
      country: "Italy",
      season: "2024-25",
      teams: 20,
      founded: 1898,
      icon: "/images/seriea_white.svg",
      gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "#22c55e",
      route: "seriea",
    },
    {
      id: 4,
      name: "Bundesliga #Under_Construction",
      country: "Germany",
      season: "2024-25",
      teams: 18,
      founded: 1963,
      icon: "/images/bundesliga_white.svg",
      gradient: "linear-gradient(135deg, #dc2626, #991b1b)",
      bgColor: "rgba(220, 38, 38, 0.1)",
      borderColor: "#dc2626",
      route: "bundesliga",
    },
    {
      id: 5,
      name: "Ligue 1 #Under_Construction",
      country: "France",
      season: "2024-25",
      teams: 18,
      founded: 1932,
      icon: Flame,
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      bgColor: "rgba(139, 92, 246, 0.1)",
      borderColor: "#8b5cf6",
      route: "ligue1",
    },
    {
      id: 6,
      name: "International #Under_Construction",
      country: "World",
      season: "2024-25",
      teams: 10,
      founded: "Big Bang",
      icon: "/images/international_white.svg",
      gradient: "linear-gradient(135deg, #09080c, #0a0217)",
      bgColor: "rgba(5, 2, 12, 0.25)",
      borderColor: "#020106",
      route: "international",
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb
            color="radial-gradient(circle, #00f5ff, transparent)"
            duration="20"
            delay="0"
            style={{ top: "10%", left: "10%", width: "300px", height: "300px" }}
          />
          <Orb
            color="radial-gradient(circle, #ff6b35, transparent)"
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
            color="radial-gradient(circle, #22c55e, transparent)"
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
            color="radial-gradient(circle, #dc2626, transparent)"
            duration="28"
            delay="12"
            style={{
              bottom: "20%",
              right: "30%",
              width: "320px",
              height: "320px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #8b5cf6, transparent)"
            duration="24"
            delay="3"
            style={{
              bottom: "10%",
              left: "20%",
              width: "380px",
              height: "380px",
            }}
          />
        </BackgroundOrbs>

        <Header>
          <Logo>
            <Trophy
              style={{ color: "#00f5ff", width: "2rem", height: "2rem" }}
            />
            <h1>FutyHub</h1>
          </Logo>
          <Nav>
            <a href="/home">Home</a>
            <a href="/leagues" className="active">
              Leagues
            </a>
            <a href="/teams">Teams</a>
            <a href="/stats">Statistics</a>
            <a href="/about">About</a>
          </Nav>
        </Header>

        <MainContent>
          <HeroSection>
            <Title>Football Leagues</Title>
            <Subtitle>
              Explore the top leagues from around the world. Discover teams,
              standings, and dive deep into the competitions that define
              football.
            </Subtitle>
          </HeroSection>

          <LeaguesGrid>
            {leagues.map((league, index) => (
              <LeagueCard
                key={league.id}
                gradient={league.gradient}
                bgColor={league.bgColor}
                borderColor={league.borderColor}
                onClick={() => (window.location.href = `/${league.route}`)}
                delay={index * 0.1}
              >
                <LeagueHeader>
                  <LeagueIcon>
                    <LeagueImg src={league.icon} alt={league.name} />
                  </LeagueIcon>
                  <LeagueInfo>
                    <h3>{league.name}</h3>
                    <LeagueDetails>
                      <span>
                        <MapPin size={14} /> {league.country}
                      </span>
                      <span>
                        <Calendar size={14} /> {league.season}
                      </span>
                      <span>
                        <Users size={14} /> {league.teams} teams
                      </span>
                    </LeagueDetails>
                  </LeagueInfo>
                  <ExpandIcon>
                    <ChevronRight size={24} />
                  </ExpandIcon>
                </LeagueHeader>
              </LeagueCard>
            ))}
          </LeaguesGrid>

          <StatsSection>
            <SectionTitle>League Statistics</SectionTitle>
            <StatsGrid>
              <StatCard>
                <span className="number">{leagues.length}</span>
                <div className="label">Active Leagues</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {leagues.reduce((total, league) => total + league.teams, 0)}
                </span>
                <div className="label">Total Teams</div>
              </StatCard>
              <StatCard>
                <span className="number">5</span>
                <div className="label">Countries</div>
              </StatCard>
              <StatCard>
                <span className="number">1,800+</span>
                <div className="label">Total Players</div>
              </StatCard>
            </StatsGrid>
          </StatsSection>
        </MainContent>
      </Container>
    </>
  );
}

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

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f172a, #1e293b);
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
    font-weight: 600;
    background: linear-gradient(135deg, #00f5ff, #ff6b35);
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
      color: #00f5ff;
      transform: translateY(-2px);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00f5ff, #ff6b35);
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }

    &.active {
      color: #00f5ff;
    }
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #00f5ff,
    #ff6b35,
    #22c55e,
    #dc2626,
    #8b5cf6
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const LeaguesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const LeagueCard = styled.div`
  background: ${(props) => props.bgColor};
  backdrop-filter: blur(15px);
  border: 2px solid ${(props) => props.borderColor}33;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeInUp} 1s ease-out ${(props) => props.delay}s both;

  &:hover {
    transform: translateY(-5px);
    border-color: ${(props) => props.borderColor};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.isSelected &&
    `
    border-color: ${props.borderColor};
    transform: translateY(-3px);
  `}
`;

const LeagueHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const LeagueIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.borderColor || "#00f5ff"};
`;

const LeagueImg = styled.img`
  width: 40px;
  height: 40px;
`;

const LeagueInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.8rem;
  }
`;

const LeagueDetails = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ExpandIcon = styled.div`
  transition: transform 0.3s ease;
  color: #94a3b8;

  &:hover {
    color: ${(props) => props.borderColor || "#00f5ff"};
    transform: translateX(5px);
  }
`;

const StatsSection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: white;
  margin-bottom: 3rem;

  .accent {
    background: linear-gradient(135deg, #00f5ff, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
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
    background: linear-gradient(135deg, #00f5ff, #ff6b35);
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
