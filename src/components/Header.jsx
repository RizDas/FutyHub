import React from "react";
import styled from "styled-components";
import { Trophy } from "lucide-react";

const Header = () => {
  const navItems = [
    { href: "/home", label: "Home", page: "home" },
    { href: "/leagues", label: "Leagues", page: "leagues" },
    { href: "/stats", label: "Statistics", page: "stats" },
    { href: "/about", label: "About", page: "about" },
  ];

  return (
    <Head>
      <Logo>
        <Trophy style={{ color: "#00f5ff", width: "2rem", height: "2rem" }} />
        <h1>FutyHub</h1>
      </Logo>
      <Nav>
        {navItems.map((item) => (
          <a key={item.page} href={item.href} className="">
            {item.label}
          </a>
        ))}
      </Nav>
    </Head>
  );
};

const Head = styled.header`
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -102px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }
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

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  a {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
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

export default Header;
