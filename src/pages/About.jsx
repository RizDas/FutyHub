import React, { useRef, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Trophy,
  Target,
  Heart,
  Zap,
  Globe,
  Users,
  Database,
  Shield,
  ArrowRight,
  Star,
  Award,
  Compass,
  BrainCog,
  BookUp2,
  NotepadTextDashed,
} from "lucide-react";

// Tilt Component
const TiltCard = ({ children, gradient, iconColor, className }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <ValueCard
      ref={cardRef}
      gradient={gradient}
      iconColor={iconColor}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {children}
    </ValueCard>
  );
};

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description:
        "We deliver accurate, up-to-date information with meticulous attention to detail across every league and team.",
      iconColor: "#00f5ff",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Built by football enthusiasts, for football enthusiasts. Our love for the beautiful game drives everything we do.",
      iconColor: "#ff6b35",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Cutting-edge technology meets traditional football wisdom to create the ultimate fan experience.",
      iconColor: "#ffd700",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Transparent, reliable data you can trust. No bias, no agenda—just pure football information.",
      iconColor: "#c77dff",
    },
  ];

  const team = [
    {
      name: "Rishabh Das",
      role: "Founder & CEO",
      icon: Trophy,
      gradient: "#00f5ff, #0084ff",
      description: "Former sports analyst with 10+ years in football data",
    },
    {
      name: "Rishabh Das",
      role: "Head of Data",
      icon: Database,
      gradient: "#ff6b35, #f7931e",
      description: "Expert in sports analytics and database architecture",
    },
    {
      name: "Rishabh Das",
      role: "Lead Developer ",
      icon: Zap,
      gradient: "#ffd700, #ffb347",
      description: "Full-stack developer specializing in real-time systems",
    },
    {
      name: "Rishabh Das",
      role: "UI/UX Designer",
      icon: Compass,
      gradient: "#c77dff, #9d4edd",
      description: "Passionate about creating intuitive user experiences",
    },
    {
      name: "Claude AI",
      role: "Scaffolding AI",
      icon: BrainCog,
      gradient: "#43e674, #07a72a",
      description:
        "AI-powered assistant for writing basic struture and framework",
    },
    {
      name: "Bighnesh Mukherjee",
      role: "Game Expert",
      icon: NotepadTextDashed,
      gradient: "#ec401e, #9f1902",
      description:
        "Specilist in football knowledge,game strategies and analysis, ensuring accurate data",
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb
            color="radial-gradient(circle, #00f5ff, transparent)"
            duration="22"
            delay="0"
            style={{ top: "15%", left: "15%", width: "250px", height: "250px" }}
          />
          <Orb
            color="radial-gradient(circle, #ff6b35, transparent)"
            duration="28"
            delay="7"
            style={{
              top: "40%",
              right: "15%",
              width: "350px",
              height: "350px",
            }}
          />
          <Orb
            color="radial-gradient(circle, #ffd700, transparent)"
            duration="35"
            delay="14"
            style={{
              bottom: "20%",
              left: "30%",
              width: "300px",
              height: "300px",
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
            <a href="/leagues">Leagues</a>
            <a href="/teams">Teams</a>
            <a href="/stats">Statistics</a>
            <a href="/about" className="active">
              About
            </a>
          </Nav>
        </Header>

        <MainContent>
          <HeroSection>
            <Title>About FutyHub</Title>
            <Subtitle>
              We're on a mission to make football data accessible,
              comprehensive, and beautifully presented for fans worldwide.
            </Subtitle>
          </HeroSection>

          <MissionSection>
            <MissionContent>
              <h2>
                Our <span className="highlight">Mission</span>
              </h2>
              <p>
                Football is more than just a game—it's a global language that
                unites billions of people. At FutyHub, we believe every fan
                deserves access to comprehensive, accurate, and beautifully
                presented information about their favorite teams, players, and
                leagues.
              </p>
              <p>
                Whether you're tracking your local club's journey or exploring
                new leagues across continents, we're here to fuel your passion
                with data that matters.
              </p>
            </MissionContent>

            <MissionCard>
              <Globe
                style={{
                  color: "#00f5ff",
                  width: "4rem",
                  height: "4rem",
                  margin: "0 auto 2rem",
                }}
              />
              <h3
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                Connecting Football Worldwide
              </h3>
              <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
                From the bustling stadiums of Europe to grassroots clubs in
                every corner of the world, we're building the most comprehensive
                football database ever created.
              </p>
            </MissionCard>
          </MissionSection>

          <ValuesSection>
            <SectionTitle>
              Our <span className="accent">Values</span>
            </SectionTitle>
            <ValuesGrid>
              {values.map((value, index) => (
                <TiltCard key={index} iconColor={value.iconColor}>
                  <value.icon className="icon" />
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </TiltCard>
              ))}
            </ValuesGrid>
          </ValuesSection>

          <StorySection>
            <SectionTitle>
              Our <span className="accent">Story</span>
            </SectionTitle>
            <StoryCard>
              <p>
                FutyHub was born from a simple frustration: scattered football
                information across countless websites, outdated player lists,
                and incomplete league coverage. As passionate football fans
                ourselves, we knew there had to be a better way.
              </p>
              <div className="author">— The FutyHub Team</div>
            </StoryCard>
          </StorySection>

          <TeamSection>
            <SectionTitle>
              Meet the <span className="accent">Team</span>
            </SectionTitle>
            <TeamGrid>
              {team.map((member, index) => (
                <TeamMember key={index} gradient={member.gradient}>
                  <div className="avatar">
                    <member.icon className="icon" />
                  </div>
                  <h4>{member.name}</h4>
                  <div className="role">{member.role}</div>
                  <p>{member.description}</p>
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamSection>

          <CTASection>
            <CTACard>
              <h3>Ready to Explore?</h3>
              <p>
                Join thousands of football fans who trust FutyHub for their
                daily dose of football knowledge and discovery.
              </p>
              <CTAButton onClick={() => (location.href = "/leagues")}>
                Start Your Journey <ArrowRight size={20} />
              </CTAButton>
            </CTACard>
          </CTASection>
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
  50% { transform: translateY(-15px) rotate(180deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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
    font-weight: 800;
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

    &:hover::after {
      width: 100%;
    }

    &.active {
      color: #00f5ff;
    }

    &.active::after {
      width: 100%;
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
  margin-bottom: 6rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #00f5ff, #ff6b35, #ffd700);
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
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const MissionSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 6rem 0;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MissionContent = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;

    .highlight {
      background: linear-gradient(135deg, #ff6b35, #ffd700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
`;

const MissionCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00f5ff, #ff6b35, #ffd700, #00f5ff);
    border-radius: 25px;
    z-index: -1;
    animation: ${shimmer} 3s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 46, 0.9);
    border-radius: 23px;
    z-index: -1;
  }
`;

const ValuesSection = styled.section`
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

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .icon {
    width: 3.5rem;
    height: 3.5rem;
    color: ${(props) => props.iconColor};
    margin: 0 auto 1.5rem;
    animation: ${pulse} 2.5s ease-in-out infinite;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    color: #94a3b8;
    line-height: 1.6;
  }
`;

const StorySection = styled.section`
  margin: 6rem 0;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

const StoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 4rem 3rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 4rem;
    color: #00f5ff;
    font-family: serif;
    opacity: 0.3;
  }

  p {
    color: #e2e8f0;
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-style: italic;
  }

  .author {
    color: #00f5ff;
    font-weight: 600;
    font-style: normal;
  }
`;

const TeamSection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.8s both;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${(props) => props.gradient});
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 2rem;
      height: 2rem;
      color: white;
    }
  }

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .role {
    color: #00f5ff;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const CTASection = styled.section`
  text-align: center;
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 1s both;
`;

const CTACard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 4rem 3rem;
  max-width: 600px;
  margin: 0 auto;

  h3 {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    color: #cbd5e1;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border: none;
  border-radius: 25px;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
  }
`;
