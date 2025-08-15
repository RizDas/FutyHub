import React from "react";
import styled from "styled-components";
import {
  Trophy,
  Mail,
  Github,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <Foot>
      <FooterContent>
        <LeftSection>
          <Brand>
            <Trophy size={20} style={{ color: "#00f5ff" }} />
            <h3>FutyHub</h3>
          </Brand>
          <Description>The world of football, simplified.</Description>
        </LeftSection>

        <SocialLinks>
          <a href="#" aria-label="Twitter">
            <Twitter size={16} />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="#" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="#" aria-label="Email">
            <Mail size={16} />
          </a>
        </SocialLinks>

        <Copyright>
          © 2025 FutyHub. All rights reserved. Made by RizDas
        </Copyright>
      </FooterContent>
    </Foot>
  );
};

const Foot = styled.footer`
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  padding: 1.5rem 0;
  font-family: monospace, sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h3 {
    background: linear-gradient(45deg, #00f5ff, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
  }
`;

const Description = styled.p`
  color: #94a3b8;
  font-size: 0.8rem;
  margin: 0;
  max-width: 300px;
  line-height: 2;
  margin-top: 4px;
`;

const Copyright = styled.div`
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 3px;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #94a3b8;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 245, 255, 0.1);
      color: #00f5ff;
      transform: translateY(-1px);
    }
  }
`;

export default Footer;
