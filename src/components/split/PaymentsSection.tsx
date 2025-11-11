"use client";

import styled from "styled-components";
import { IndustryCarousel } from "./IndustryCarousel";

const cardColors = [
  "#C67C5F", // Terracotta
  "#B7CDC5", // Mint
  "#E4DACB", // Beige
  "#C9C8DA", // Lavender
];

export function PaymentsSection() {
  return (
    <Wrap id="payments">
      <Inner>
        <Copy>
          <Heading>Payments built for every business</Heading>
          <Text>
            POS, online, and mobile — fast, secure, and all connected to Split.
          </Text>

          <Grid>
            <Card $color={cardColors[0]}>POS terminals, online gateways, and mobile payments</Card>
            <Card $color={cardColors[1]}>Real-time reporting &amp; reconciliation</Card>
            <Card $color={cardColors[2]}>Competitive, transparent pricing</Card>
            <Card $color={cardColors[3]}>Dedicated account support</Card>
          </Grid>

          <CTA href="#get-started">Start accepting payments</CTA>
        </Copy>

        <CarouselWrapper>
          <IndustryCarousel />
        </CarouselWrapper>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 6rem 10%;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  gap: clamp(2rem, 6vw, 4rem);
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Copy = styled.div`
  flex: 1 1 360px;
  text-align: left;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const Heading = styled.h2`
  font-family: "Inter Tight", var(--font-poppins), system-ui, sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #0A0A0A;
  margin: 0 0 1rem;
`;

const Text = styled.p`
  font-family: "Source Serif 4", var(--font-lora), Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #2C2C2C;
  max-width: 720px;
  margin: 0 0 2rem;

  @media (max-width: 900px) {
    margin: 0 auto 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  max-width: 620px;
  margin: 0 0 2rem;

  @media (max-width: 900px) {
    margin: 0 auto 2rem;
  }
`;

type CardProps = {
  $color: string;
};

const Card = styled.div<CardProps>`
  background: ${({ $color }) => $color};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.4rem;
  text-align: left;
  font-family: "Source Serif 4", var(--font-lora), Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #0A0A0A;
`;

const CTA = styled.a`
  font-family: "Inter Tight", var(--font-poppins), system-ui, sans-serif;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 0.9rem 1.6rem;
  border-radius: 10px;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
  }
`;

const CarouselWrapper = styled.div`
  flex: 1 1 340px;
  max-width: 600px;
  position: relative;
  min-height: 500px;

  @media (max-width: 900px) {
    margin: 0 auto;
    width: 100%;
  }
`;
