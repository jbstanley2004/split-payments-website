"use client";

import styled from "styled-components";
import { SplitPressButton } from "@/components/split-press-button";

export function POSSection() {
  return (
    <Wrap id="pos">
      <Inner>
        <Copy>
          <Heading>POS that works the way you do</Heading>
          <Text>
            Accept cards, taps, or mobile wallets — all synced to Split’s
            dashboard.
          </Text>

          <List>
            <li>Multi-location management</li>
            <li>Inventory &amp; employee insights</li>
            <li>Built-in funding eligibility tracking</li>
          </List>

          <div style={{ marginTop: '1rem' }}>
            <SplitPressButton href="#get-started" />
          </div>
        </Copy>

        <Graphic aria-hidden="true">
          <FeatureCard>
            <FeatureHeader>
              <small>Features</small>
              <strong>Frictionless experience</strong>
            </FeatureHeader>
            <AdvanceCard>
              <AdvanceRow>
                <span>Advance amount</span>
                <strong>$10,000</strong>
              </AdvanceRow>
              <AdvanceSlider>
                <AdvanceFill style={{ width: "64%" }} />
                <AdvanceThumb style={{ left: "64%" }} />
              </AdvanceSlider>
              <AdvanceFooter>
                <span>Selected advance amount</span>
                <button type="button">Edit</button>
              </AdvanceFooter>
            </AdvanceCard>
            <FeatureCopy>
              Fast funding with no credit checks or personal guarantees. Get
              capital in a few steps and receive funds in as little as one day.
            </FeatureCopy>
          </FeatureCard>

          <FeatureCard>
            <FeatureHeader>
              <small>Features</small>
              <strong>Sales-based payments</strong>
            </FeatureHeader>
            <BreakdownCard>
              <BreakdownTitle>How automatic payments work</BreakdownTitle>
              <BreakdownList>
                <li>
                  <span>Daily sales</span>
                  <strong>$2,300</strong>
                </li>
                <li>
                  <span>Payment rate</span>
                  <strong>12%</strong>
                </li>
                <li>
                  <span>Daily sweep</span>
                  <strong>$276</strong>
                </li>
              </BreakdownList>
            </BreakdownCard>
            <FeatureCopy>
              Make payments automatically that flex up and down with your card
              sales — no monthly minimums.
            </FeatureCopy>
          </FeatureCard>
        </Graphic>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 6rem 10%;
  background: linear-gradient(180deg, #080808 0%, #0f0f0f 100%);
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
  font-size: 2rem;
  margin: 0 0 1rem;
`;

const Text = styled.p`
  max-width: 700px;
  margin: 0 0 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 900px) {
    margin: 0 auto 1.6rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  max-width: 520px;
  text-align: left;

  li {
    margin: 0.55rem 0;
  }

  li::before {
    content: "✔ ";
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 900px) {
    margin: 0 auto 2rem;
  }
`;

const CTA = styled.a`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
  }
`;

const Graphic = styled.div`
  flex: 1 1 340px;
  max-width: 520px;
  display: grid;
  gap: 2rem;

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(180deg, rgba(22, 22, 22, 0.9) 0%, rgba(12, 12, 12, 0.9) 100%);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem;
  display: grid;
  gap: 1.4rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
`;

const FeatureHeader = styled.div`
  display: grid;
  gap: 0.35rem;

  small {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.55);
  }

  strong {
    font-size: 1.4rem;
  }
`;

const FeatureCopy = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const AdvanceCard = styled.div`
  background: rgba(0, 0, 0, 0.55);
  border-radius: 20px;
  padding: 1.4rem;
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const AdvanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.55);
  }

  strong {
    font-size: 1.6rem;
  }
`;

const AdvanceSlider = styled.div`
  position: relative;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
`;

const AdvanceFill = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff9066 0%, #ff583d 100%);
`;

const AdvanceThumb = styled.div`
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 5px solid #121212;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
`;

const AdvanceFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 600;
    cursor: pointer;
  }
`;

const BreakdownCard = styled.div`
  background: rgba(0, 0, 0, 0.55);
  border-radius: 20px;
  padding: 1.6rem;
  display: grid;
  gap: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const BreakdownTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
`;

const BreakdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
  }

  span {
    color: rgba(255, 255, 255, 0.55);
  }

  strong {
    font-size: 1.1rem;
  }
`;
