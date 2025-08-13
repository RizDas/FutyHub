import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import {
  Search,
  Trophy,
  Users,
  BarChart3,
  ArrowRight,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import teamReducer from "../features/teams/teamslice";

const HomeWrapper = () => {
  const rootReducer = combineReducers({
    content: teamReducer,
  });
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

// Counter Animation Hook
const useCountAnimation = (endValue, duration, isVisible) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(endValue * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible]);

  return count;
};

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.3,
        ...options,
      }
    );
    let observerRefValue = null;
    if (elementRef.current) {
      observerRefValue = elementRef.current;
      observer.observe(observerRefValue);
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hasAnimated, options]);

  return [elementRef, isVisible];
};

// Animated Stat Card Component
const AnimatedStatCard = ({ number, label, duration = 3000 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  // Extract numeric value and suffix
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const suffix = number.replace(/[0-9]/g, "");

  const animatedCount = useCountAnimation(numericValue, duration, isVisible);

  return (
    <StatCard ref={ref}>
      <span className="number">
        {animatedCount}
        {suffix}
      </span>
      <div className="label">{label}</div>
    </StatCard>
  );
};

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
    <FeatureCard
      ref={cardRef}
      gradient={gradient}
      iconColor={iconColor}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {children}
    </FeatureCard>
  );
};

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    { number: "10+", label: "Football Leagues", duration: 2000 },
    { number: "185+", label: "Teams Covered", duration: 2000 },
    { number: "2000+", label: "Player Profiles", duration: 2000 },
    { number: "10+", label: "Countries", duration: 2000 },
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Access teams and leagues from every corner of the football world, from Premier League to local championships.",
      gradient: "linear-gradient(90deg, #00f5ff, #0084ff)",
      iconColor: "#00f5ff",
    },
    {
      icon: Users,
      title: "Complete Squads",
      description:
        "Detailed player rosters, positions, and stats for every team in our comprehensive database.",
      gradient: "linear-gradient(90deg, #ff6b35, #f7931e)",
      iconColor: "#ff6b35",
    },
    {
      icon: BarChart3,
      title: "Live Statistics",
      description:
        "Real-time stats, performance metrics, and historical data to fuel your football passion.",
      gradient: "linear-gradient(90deg, #ffd700, #ffb347)",
      iconColor: "#ffd700",
    },
    {
      icon: Trophy,
      title: "League Insights",
      description:
        "Explore every competition from top-tier leagues to emerging tournaments worldwide.",
      gradient: "linear-gradient(90deg, #9d4edd, #c77dff)",
      iconColor: "#c77dff",
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
            color="radial-gradient(circle, #ffd700, transparent)"
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
              style={{ color: "#00f5ff", width: "2rem", height: "2rem" }}
            />
            <h1>FutyHub</h1>
          </Logo>
          <Nav>
            <a href="/leagues">Leagues</a>
            <a href="/teams">Teams</a>
            <a href="/stats">Statistics</a>
            <a href="/about">About</a>
          </Nav>
        </Header>

        <MainContent>
          <HeroSection>
            <Title>Your Ultimate Football Directory</Title>
            <Subtitle>
              Explore every team, league, and squad in one place. Discover
              stats, rosters, and more with unparalleled ease and depth.
            </Subtitle>
          </HeroSection>

          <SearchSection>
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search teams or leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton>
                Search <ArrowRight size={16} />
              </SearchButton>
            </SearchContainer>
          </SearchSection>

          <FeaturesSection>
            {features.map((feature, index) => (
              <TiltCard
                key={index}
                gradient={feature.gradient}
                iconColor={feature.iconColor}
              >
                <feature.icon className="icon" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </TiltCard>
            ))}
          </FeaturesSection>

          <StatsSection>
            {statsData.map((stat, index) => (
              <AnimatedStatCard
                key={index}
                number={stat.number}
                label={stat.label}
                duration={stat.duration}
              />
            ))}
          </StatsSection>

          <CTASection>
            <CTAButton onClick={() => (location.href = "/leagues")}>
              Start Exploring <ArrowRight size={25} />
            </CTAButton>
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
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
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
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding: 4rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h2`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, #00f5ff, #ff6b35, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #cbd5e1;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  margin: 4rem 0;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.5rem 4rem 1.5rem 3rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: #00f5ff;
    box-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 1.5rem;
  height: 1.5rem;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #00f5ff, #0084ff);
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 245, 255, 0.4);
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => props.gradient};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }

  .icon {
    width: 3rem;
    height: 3rem;
    color: ${(props) => props.iconColor};
    margin-bottom: 1.5rem;
    animation: ${pulse} 2s ease-in-out infinite;
    transition: transform 0.4s ease;
    transform-style: preserve-3d;
  }

  &:hover .icon {
    transform: translateZ(20px) rotateY(10deg);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    transition: transform 0.4s ease;
    transform-style: preserve-3d;
  }

  &:hover h3 {
    transform: translateZ(15px);
  }

  p {
    color: #94a3b8;
    line-height: 1.6;
    transition: transform 0.4s ease;
    transform-style: preserve-3d;
  }

  &:hover p {
    transform: translateZ(10px);
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

const StatCard = styled.div`
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  .number {
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00f5ff, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    transition: all 0.3s ease;
    min-height: 4rem;
    line-height: 1;
  }

  .label {
    color: #cbd5e1;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: color 0.3s ease;
  }

  &:hover .number {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.5));
  }

  &:hover .label {
    color: #e2e8f0;
  }
`;

const CTASection = styled.section`
  margin: 6rem 0;
  animation: ${fadeInUp} 1s ease-out 0.8s both;
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

export default HomeWrapper;
