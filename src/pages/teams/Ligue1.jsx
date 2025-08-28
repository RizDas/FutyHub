import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  Shield,
  Globe,
  Crown,
  Zap,
  ArrowLeft,
  Flame,
} from "lucide-react";

// Import Ligue 1 teams
import * as Ligue1Teams from "../../../library/ligue1/index.js";

export default function Ligue1() {
  const [searchTerm, setSearchTerm] = useState("");

  // Convert imported team objects to the format needed for the component
  const formatTeamsData = (teamsObject) => {
    return Object.entries(teamsObject).map(([key, team], index) => ({
      id: index + 1,
      name: key.replace(/([A-Z])/g, " $1").trim(),
      city: team.city,
      founded: team.founded,
      stadium: team.stadium,
      players: Math.floor(Math.random() * 10) + 20,
      logo: Flame,
      colors: "#8b5cf6",
      position: index + 1, // League position
      points: Math.floor(Math.random() * 30) + 50, // Random points
      played: Math.floor(Math.random() * 5) + 25, // Games played
    }));
  };

  const teams = formatTeamsData(Ligue1Teams);
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            color="radial-gradient(circle, #7c3aed, transparent)"
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
            color="radial-gradient(circle, #6366f1, transparent)"
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
              style={{ color: "#8b5cf6", width: "2rem", height: "2rem" }}
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
              <Flame size={80} />
            </LeagueIconLarge>
            <Title>Ligue 1</Title>
            <LeagueInfo>
              <InfoItem>
                <MapPin size={20} />
                <span>France</span>
              </InfoItem>
              <InfoItem>
                <Calendar size={20} />
                <span>Founded 1932</span>
              </InfoItem>
              <InfoItem>
                <Users size={20} />
                <span>{teams.length} Teams</span>
              </InfoItem>
              <InfoItem>
                <Trophy size={20} />
                <span>Season 2024-25</span>
              </InfoItem>
            </LeagueInfo>
            <Subtitle>
              France's top football division. Where technical flair meets
              passionate support in the land of "Le Championnat".
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
                <TeamCard key={team.id} delay={index * 0.1}>
                  <TeamRank>#{team.position}</TeamRank>
                  <TeamLogo>
                    <team.logo size={40} />
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
                    <TeamStats>
                      <StatItem>
                        <span className="label">Points</span>
                        <span className="value">{team.points}</span>
                      </StatItem>
                      <StatItem>
                        <span className="label">Played</span>
                        <span className="value">{team.played}</span>
                      </StatItem>
                    </TeamStats>
                  </TeamInfo>
                </TeamCard>
              ))}
            </TeamsGrid>
          </TeamsSection>

          <StatsSection>
            <SectionTitle>League Overview</SectionTitle>
            <StatsGrid>
              <StatCard>
                <span className="number">{teams.length}</span>
                <div className="label">Total Teams</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {teams.reduce((sum, team) => sum + team.players, 0)}
                </span>
                <div className="label">Total Players</div>
              </StatCard>
              <StatCard>
                <span className="number">
                  {new Set(teams.map((team) => team.city)).size}
                </span>
                <div className="label">Cities</div>
              </StatCard>
              <StatCard>
                <span className="number">1932</span>
                <div className="label">Founded</div>
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

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #2d1b4e, #3730a3, #1e1b4b, #312e81);
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
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
      background: linear-gradient(90deg, #8b5cf6, #7c3aed);
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
  width: 120px;
  height: 120px;
  border-radius: 30px;
  background: rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  margin: 0 auto 2rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.2;
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
    color: #8b5cf6;
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
    border-color: #8b5cf6;
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
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
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
    transform: translateY(-8px);
    border-color: #8b5cf6;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 25px 50px rgba(139, 92, 246, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8b5cf6, #7c3aed);
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
  background: rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  font-weight: 700;
  font-size: 0.9rem;
`;

const TeamLogo = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  margin-bottom: 1.5rem;
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
    color: #8b5cf6;
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
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
