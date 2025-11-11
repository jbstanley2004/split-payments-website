"use client";

import styled from "styled-components";
import { useEffect } from "react";

const cardColors = [
  "#C67C5F", // Terracotta
  "#B7CDC5", // Mint
  "#E4DACB", // Beige
  "#C9C8DA", // Lavender
];

export function PaymentsSection() {
  useEffect(() => {
    // Dynamically import and initialize the liquid glass effect
    import("@/utils/liquidGlass").then((module) => {
      // Apply the effect to each card
      new (module.default || window.Gerasu)(".payment-glass-card", {
        darknessOpacity: 17,
        darknessBlur: 5,
        lightnessOpacity: 17,
        lightnessBlur: 15,
        centerDistortion: 68,
        centerSize: 15,
        preBlur: 7,
        postBlur: 0,
        iridescence: 20,
      });
    });
  }, []);

  return (
    <Wrap id="payments">
      <Inner>
        <Copy>
          <Heading>Payments built for every business</Heading>
          <Text>
            POS, online, and mobile — fast, secure, and all connected to Split.
          </Text>

          <Grid>
            <Card className="payment-glass-card" $color={cardColors[0]}>POS terminals, online gateways, and mobile payments</Card>
            <Card className="payment-glass-card" $color={cardColors[1]}>Real-time reporting &amp; reconciliation</Card>
            <Card className="payment-glass-card" $color={cardColors[2]}>Competitive, transparent pricing</Card>
            <Card className="payment-glass-card" $color={cardColors[3]}>Dedicated account support</Card>
          </Grid>

          <CTA href="#get-started">Start accepting payments</CTA>
        </Copy>

        <Graphic aria-hidden="true">
          <FeaturePanel>
            <FeatureHeader>
              <FeatureNumber>03</FeatureNumber>
              <FeatureMeta>
                <small>Features</small>
                <strong>Pre-approved offers</strong>
              </FeatureMeta>
            </FeatureHeader>
            <FeatureCard>
              <FeatureBadge>
                Your business is pre-approved for $10,000 in working capital.
              </FeatureBadge>
              <FeatureCopy>
                Pre-approved offers guarantee access to the full amount offered
                once fraud &amp; compliance checks are passed.
              </FeatureCopy>
              <FeatureHint>
                Avoid the disappointment of getting denied after a hard credit
                pull thanks to our pre-approved offers.
              </FeatureHint>
            </FeatureCard>
          </FeaturePanel>

          <FeaturePanel>
            <FeatureHeader>
              <FeatureNumber>04</FeatureNumber>
              <FeatureMeta>
                <small>Features</small>
                <strong>Flexible capital access</strong>
              </FeatureMeta>
            </FeatureHeader>
            <FeatureCard>
              <FeatureTabs>
                <span>Advances</span>
                <span>All</span>
                <span>Active</span>
                <span>Paid</span>
              </FeatureTabs>
              <FeatureList>
                <li>
                  <strong>$5,000</strong>
                  <span>Split Terminal</span>
                  <time>July 3, 2024</time>
                </li>
                <li>
                  <strong>$12,500</strong>
                  <span>Split eCommerce</span>
                  <time>August 5, 2024</time>
                </li>
              </FeatureList>
              <FeatureHint>
                Capital availability that offers similar benefits to a line of
                credit.
              </FeatureHint>
            </FeatureCard>
          </FeaturePanel>
        </Graphic>
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
  position: relative;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.4rem;
  text-align: left;
  font-family: "Source Serif 4", var(--font-lora), Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #0A0A0A;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }
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

const Graphic = styled.div`
  flex: 1 1 340px;
  max-width: 500px;
  background: linear-gradient(180deg, #fafafa 0%, #f1f1f1 100%);
  border-radius: 32px;
  padding: 2.6rem;
  display: grid;
  gap: 2.4rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 35px 70px rgba(15, 15, 15, 0.16);

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const FeaturePanel = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const FeatureHeader = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
`;

const FeatureNumber = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);
`;

const FeatureMeta = styled.div`
  display: grid;
  gap: 0.2rem;

  small {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(0, 0, 0, 0.5);
  }

  strong {
    font-size: 1.1rem;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1.6rem;
  display: grid;
  gap: 0.9rem;
`;

const FeatureBadge = styled.div`
  font-weight: 700;
  line-height: 1.4;
`;

const FeatureCopy = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
`;

const FeatureHint = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;

const FeatureTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.5);

  span:first-child {
    background: #0d0d0d;
    color: #fff;
    border-radius: 12px;
    padding: 0.4rem 0.6rem;
    text-align: center;
  }

  span:not(:first-child) {
    padding: 0.4rem 0.6rem;
    border-radius: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.04);
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;

  li {
    display: grid;
    gap: 0.25rem;
  }

  strong {
    font-size: 1.1rem;
  }

  span {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
  }

  time {
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.45);
  }
`;
