import React from "react";
import styled, { keyframes } from "styled-components";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Star,
  MapPin,
  Users,
} from "lucide-react";

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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Leaderboard = ({ teams = [] }) => {
  // Sort teams by points in descending order
  const sortedTeams = [...teams].sort((a, b) => {
    const pointsA = a.points || 0;
    const pointsB = b.points || 0;
    return pointsB - pointsA;
  });

  // Get rank icon based on position
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Crown size={24} style={{ color: "#FFD700" }} />;
      case 2:
        return <Medal size={24} style={{ color: "#C0C0C0" }} />;
      case 3:
        return <Trophy size={24} style={{ color: "#CD7F32" }} />;
      default:
        return <Star size={20} style={{ color: "#64748b" }} />;
    }
  };

  // Get rank colors based on position
  const getRankColors = (position) => {
    if (position === 1) {
      return {
        gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
        glow: "rgba(255, 215, 0, 0.3)",
        border: "#FFD700",
      };
    } else if (position === 2) {
      return {
        gradient: "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
        glow: "rgba(192, 192, 192, 0.3)",
        border: "#C0C0C0",
      };
    } else if (position === 3) {
      return {
        gradient: "linear-gradient(135deg, #CD7F32, #A0522D)",
        glow: "rgba(205, 127, 50, 0.3)",
        border: "#CD7F32",
      };
    }
    return {
      gradient: "linear-gradient(135deg, #00f5ff, #0084ff)",
      glow: "rgba(0, 245, 255, 0.2)",
      border: "#00f5ff",
    };
  };

  if (!teams || teams.length === 0) {
    return (
      <Container>
        <Header>
          <Title>
            <Trophy size={32} />
            League Leaderboard
          </Title>
          <Subtitle>Points-based team rankings</Subtitle>
        </Header>
        <EmptyState>
          <Trophy
            size={64}
            style={{ color: "#64748b", marginBottom: "1rem" }}
          />
          <p>No teams available</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <Trophy size={32} />
          League Leaderboard
        </Title>
        <Subtitle>Points-based team rankings</Subtitle>
        <StatsBar>
          <StatItem>
            <span className="label">Total Teams</span>
            <span className="value">{sortedTeams.length}</span>
          </StatItem>
          <StatItem>
            <span className="label">Total Points</span>
            <span className="value">
              {sortedTeams.reduce((sum, team) => sum + (team.points || 0), 0)}
            </span>
          </StatItem>
          <StatItem>
            <span className="label">Leader</span>
            <span className="value">{sortedTeams[0]?.points || 0} pts</span>
          </StatItem>
        </StatsBar>
      </Header>

      <LeaderboardTable>
        {sortedTeams.map((team, index) => {
          const position = index + 1;
          const colors = getRankColors(position);

          return (
            <TeamRow
              key={team.id || `${team.name}-${index}`}
              position={position}
              colors={colors}
              delay={index * 0.05}
            >
              <RankSection>
                <RankNumber position={position}>{position}</RankNumber>
                <RankIcon>{getRankIcon(position)}</RankIcon>
              </RankSection>

              <TeamSection>
                <TeamLogo>
                  {typeof team.logo === "string" ? (
                    <TeamLogoImage
                      src={team.logo || "/images/default-team.svg"}
                      alt={team.name}
                      onError={(e) => {
                        e.target.src = "/images/default-team.svg";
                      }}
                    />
                  ) : React.isValidElement(team.logo) ? (
                    team.logo
                  ) : typeof team.logo === "function" ? (
                    React.createElement(team.logo, { size: 40 })
                  ) : (
                    <Trophy size={40} style={{ color: colors.border }} />
                  )}
                </TeamLogo>
                <TeamDetails>
                  <TeamName>{team.name}</TeamName>
                  <TeamMeta>
                    <MetaItem>
                      <MapPin size={12} />
                      <span>{team.city || "Unknown"}</span>
                    </MetaItem>
                    <MetaItem>
                      <Users size={12} />
                      <span>{team.players || 0} players</span>
                    </MetaItem>
                  </TeamMeta>
                </TeamDetails>
              </TeamSection>

              <StatsSection>
                <PointsDisplay colors={colors}>
                  <PointsNumber>{team.points || 0}</PointsNumber>
                  <PointsLabel>Points</PointsLabel>
                </PointsDisplay>
                {position <= 3 && (
                  <TrendingIcon>
                    <TrendingUp size={16} />
                  </TrendingIcon>
                )}
              </StatsSection>
            </TeamRow>
          );
        })}
      </LeaderboardTable>
    </Container>
  );
};

export default Leaderboard;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f172a, #1e293b);
  min-height: 100vh;
  color: white;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00f5ff, #0084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  svg {
    color: #00f5ff;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;

  .label {
    display: block;
    font-size: 0.9rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #00f5ff, #0084ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const LeaderboardTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TeamRow = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out ${(props) => props.delay}s both;

  &:hover {
    transform: translateY(-5px);
    border-color: ${(props) => props.colors.border};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px ${(props) => props.colors.glow};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.colors.gradient};
    opacity: ${(props) => (props.position <= 3 ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  ${(props) =>
    props.position === 1 &&
    `
    animation: ${pulse} 2s ease-in-out infinite;
    border-color: #FFD700;
    background: rgba(255, 215, 0, 0.1);
  `}
`;

const RankSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 100px;
`;

const RankNumber = styled.div`
  font-size: 2rem;
  font-weight: 900;
  min-width: 50px;
  text-align: center;
  color: ${(props) => {
    if (props.position === 1) return "#FFD700";
    if (props.position === 2) return "#C0C0C0";
    if (props.position === 3) return "#CD7F32";
    return "#00f5ff";
  }};
`;

const RankIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  min-width: 0;
`;

const TeamLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TeamLogoImage = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.05);
`;

const TeamDetails = styled.div`
  min-width: 0;
  flex: 1;
`;

const TeamName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TeamMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.9rem;

  span {
    font-weight: 500;
  }
`;

const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PointsDisplay = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${(props) => props.colors.border};
  min-width: 100px;
`;

const PointsNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  background: ${(props) => props.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PointsLabel = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.2rem;
`;

const TrendingIcon = styled.div`
  color: #10b981;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1.1rem;
`;
