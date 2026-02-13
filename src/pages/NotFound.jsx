import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  Home,
  Search,
  ArrowRight,
  Target,
  Compass,
  RefreshCw,
  AlertTriangle,
  Heart,
  Book,
  Library,
} from "lucide-react";

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Auto glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  const quickLinks = [
    { name: "League", icon: Library, route: "/leagues" },
    { name: "Teams", icon: Target, route: "/teams" },
    { name: "About", icon: Book, route: "/about" },
  ];

  const FloatingFootball = ({ delay = 0, top, left }) => (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        fontSize: "2rem",
        opacity: 0.6,
        filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
        animation: `footballBounce 4s ease-in-out infinite ${delay}s`,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      ⚽
    </div>
  );

  const Particle = ({ delay, duration, x, y }) => (
    <div
      style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        background: "radial-gradient(circle, #00f5ff, transparent)",
        borderRadius: "50%",
        left: `${x}%`,
        top: `${y}%`,
        animation: `particleFloat ${duration}s linear infinite ${delay}s`,
        pointerEvents: "none",
      }}
    />
  );

  return (
    <div ref={containerRef} className="container">
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(
            -45deg,
            #1a1a2e,
            #16213e,
            #0f172a,
            #1e293b
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          overflow: hidden;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes footballBounce {
          0%,
          100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          25% {
            transform: translateY(-15px) rotateZ(90deg);
          }
          50% {
            transform: translateY(-30px) rotateZ(180deg);
          }
          75% {
            transform: translateY(-15px) rotateZ(270deg);
          }
        }

        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .background-orbs {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          animation: float 25s ease-in-out infinite;
        }

        .orb-1 {
          background: radial-gradient(circle, #00f5ff, transparent);
          width: 400px;
          height: 400px;
          top: 20%;
          left: 15%;
          transform: translate(
            ${mousePosition.x * 30}px,
            ${mousePosition.y * 30}px
          );
          transition: transform 0.3s ease;
        }

        .orb-2 {
          background: radial-gradient(circle, #ff6b35, transparent);
          width: 350px;
          height: 350px;
          top: 60%;
          right: 10%;
          transform: translate(
            ${mousePosition.x * -20}px,
            ${mousePosition.y * -20}px
          );
          transition: transform 0.3s ease;
          animation-delay: 3s;
        }

        .orb-3 {
          background: radial-gradient(circle, #ffd700, transparent);
          width: 300px;
          height: 300px;
          bottom: 20%;
          left: 40%;
          transform: translate(
            ${mousePosition.x * 15}px,
            ${mousePosition.y * 15}px
          );
          transition: transform 0.3s ease;
          animation-delay: 6s;
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .header {
          position: relative;
          z-index: 10;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo h1 {
          font-size: 2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #00f5ff, #ff6b35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav a {
          color: #cbd5e1;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav a:hover {
          color: #00f5ff;
          transform: translateY(-2px);
        }

        .nav a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #ff6b35);
          transition: width 0.3s ease;
        }

        .nav a:hover::after {
          width: 100%;
        }

        .main-content {
          position: relative;
          z-index: 10;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .error-section {
          animation: fadeInUp 1s ease-out;
          margin-bottom: 4rem;
        }

        .error-icon {
          color: #ff6b35;
          margin: 0 auto 2rem;
          animation: pulse 2s ease-in-out infinite;
          width: 200px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0 !important;
        }

        .glitch-404 {
          font-size: clamp(6rem, 12vw, 10rem);
          font-weight: 900;
          background: linear-gradient(135deg, #00f5ff, #ff6b35, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          transform: ${isGlitching ? "translate(-2px, 2px)" : "none"};
          filter: ${isGlitching
            ? "drop-shadow(0 0 20px rgba(0, 245, 255, 0.8))"
            : "none"};
          margin-right: 340px;
          margin-left: -250px;
        }

        .glitch-404:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.5));
        }

        .error-title {
          font-size: clamp(3rem, 5vw, 4rem);
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.2;
          font-family: "Montserrat", "Poppins", sans-serif;
        }

        .error-subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .search-suggestion {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 1rem 2rem;
          color: #cbd5e1;
          transition: all 0.3s ease;
        }

        .search-suggestion:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #00f5ff33;
          transform: translateY(-2px);
        }

        .action-section {
          animation: fadeInUp 1s ease-out 0.2s both;
          margin-bottom: 4rem;
        }

        .action-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .primary-button {
          background: linear-gradient(135deg, #00f5ff, #0084ff);
          border: none;
          border-radius: 15px;
          padding: 1.2rem 2.5rem;
          font-size: 1.5rem;
          font-weight: 500;
          font-family: "Montserrat", "Poppins", sans-serif;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          width: 500px;
          opacity: 0.9;
        }

        .primary-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(7, 7, 7, 0.4);
          opacity: 1;
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 1.2rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ff6b35;
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.3);
        }

        .quick-links-section {
          animation: fadeInUp 1s ease-out 0.4s both;
          margin-bottom: 4rem;
        }

        .quick-links-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 2rem;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .quick-link-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
          border-color: #00f5ff33;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .quick-link-card .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #00f5ff;
        }

        .quick-link-card span {
          flex: 1;
          color: white;
          font-weight: 500;
        }

        .arrow-icon {
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .quick-link-card:hover .arrow-icon {
          color: #00f5ff;
          transform: translateX(5px);
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          animation: fadeInUp 1s ease-out 0.6s both;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00f5ff, #ff6b35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #cbd5e1;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 1rem;
          }

          .nav {
            gap: 1rem;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <Trophy style={{ color: "#00f5ff", width: "2rem", height: "2rem" }} />
          <h1>FutyHub</h1>
        </div>
        <nav className="nav">
          <a href="/home">Home</a>
          <a href="/leagues">Leagues</a>
          <a href="/teams">Teams</a>
          <a href="/stats">Statistics</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Error Section */}
        <section className="error-section">
          <div style={{ display: "flex" }}>
            <div className="error-icon">
              <AlertTriangle size={135} />
            </div>

            <div
              className="glitch-404"
              onMouseEnter={() => setIsGlitching(true)}
              onMouseLeave={() => setIsGlitching(false)}
            >
              404
            </div>
          </div>
          <h1 className="error-title">Oops! This Page is Offside</h1>

          <p className="error-subtitle">
            Looks like this page has been tackled out of play. The content
            you're looking for might have been transferred to another league or
            doesn't exist in our database.
          </p>
        </section>

        {/* Action Section */}
        <section className="action-section">
          <div className="action-buttons">
            <button className="primary-button" onClick={handleGoHome}>
              Back to Home
              <ArrowRight size={30} />
            </button>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="quick-links-section">
          <h2 className="quick-links-title">Popular Destinations</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="quick-link-card"
                onClick={() => (window.location.href = link.route)}
              >
                <link.icon className="icon" />
                <span>{link.name}</span>
                <div className="arrow-icon">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Available Leagues</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">185+</div>
            <div className="stat-label">Teams to Explore</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2000+</div>
            <div className="stat-label">Player Profiles</div>
          </div>
        </section>
      </main>
    </div>
  );
}
