"use client";

import { type MouseEvent, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import styled from "styled-components";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);
  const handleLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (anchor) {
      close();
    }
  };

  return (
    <DynamicIslandContainer aria-label="Primary">
      <DynamicIsland
        $isExpanded={isExpanded}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <IslandContent $isExpanded={isExpanded}>
          <Logo href="#hero" onClick={close}>
            Split
          </Logo>

          <Links $isExpanded={isExpanded} onClick={handleLinkClick}>
            <a href="#funding">Funding</a>
            <a href="#payments">Payments</a>
            <a href="#pos">POS</a>
            <CTA href="#get-started">Get Started</CTA>
          </Links>
        </IslandContent>
      </DynamicIsland>

      <MobileMenuButton onClick={toggle} aria-label="Toggle menu">
        {open ? <FiX /> : <FiMenu />}
      </MobileMenuButton>

      <MobileLinks $open={open} onClick={handleLinkClick}>
        <a href="#funding">Funding</a>
        <a href="#payments">Payments</a>
        <a href="#pos">POS</a>
        <CTA href="#get-started">Get Started</CTA>
      </MobileLinks>
    </DynamicIslandContainer>
  );
}

const DynamicIslandContainer = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 820px) {
    width: 100%;
    top: 0;
    padding: 0 8%;
    justify-content: space-between;
  }
`;

const DynamicIsland = styled.div<{ $isExpanded: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: ${({ $isExpanded }) => ($isExpanded ? "12px 24px" : "12px 20px")};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : "120px")};
  min-width: 120px;
  max-width: 800px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 820px) {
    display: none;
  }

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
  }
`;

const IslandContent = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $isExpanded }) => ($isExpanded ? "2rem" : "0")};
  width: 100%;
  justify-content: center;
  overflow: hidden;
`;

const Logo = styled.a`
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
  flex-shrink: 0;
  font-family: var(--font-poppins), Arial, sans-serif;
`;

const Links = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  width: ${({ $isExpanded }) => ($isExpanded ? "auto" : "0")};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $isExpanded }) => ($isExpanded ? "all" : "none")};
  overflow: hidden;

  a {
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: var(--font-poppins), Arial, sans-serif;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  border: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.8rem;
  padding: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 820px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
`;

const MobileLinks = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 820px) {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 8%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-120%)")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "all" : "none")};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    a {
      color: rgba(255, 255, 255, 0.8);
      font-family: var(--font-poppins), Arial, sans-serif;
    }

    a:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const CTA = styled.a`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 0.7rem 1.4rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.95rem;
  font-family: var(--font-poppins), Arial, sans-serif;
  white-space: nowrap;
  transition: all 0.2s ease;

  @media (max-width: 820px) {
    width: 100%;
    text-align: center;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
    transform: scale(1.05);
  }
`;
