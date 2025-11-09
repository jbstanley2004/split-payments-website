"use client";

import styled from "styled-components";
import { ThickButton } from "@/components/ThickButton";

export function CTASection() {
  return (
    <Wrap id="get-started">
      <Heading>Let's Split the work — you focus on growth.</Heading>
      <Text>Fast funding. Smarter payments. Transparent pricing.</Text>
      <ThickButton href="#hero" thickness={30} travel={22} tilt={10}>
        Get Started Today →
      </ThickButton>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 6rem 10%;
  text-align: center;
  background: #000;
`;

const Heading = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.3rem);
  margin: 0 0 1rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 1.5rem;
`;

const Primary = styled.a`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 1rem 1.8rem;
  border-radius: 12px;
  font-weight: 800;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
  }
`;
