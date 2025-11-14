"use client";

import styled from "styled-components";

export function Hero() {
  return (
    <Wrap id="hero">
      <Inner>
        <Content>
          <Title>
            Accept payments. Access capital. <Accent>Grow with Split.</Accent>
          </Title>
          <Subtitle>
            Flexible merchant funding and payment services built for high-growth businesses. Get approved in minutes and repay
            automatically from your card sales.
          </Subtitle>
          <Actions>
            <Primary href="#get-started">Get Started</Primary>
            <Secondary href="#funding">Learn More</Secondary>
          </Actions>
        </Content>

        <Graphic aria-hidden="true">
          <CardStack>
            <StackCard>
              <CardHeader>
                <CardPill>Capital Offer</CardPill>
                <Status>Available</Status>
              </CardHeader>
              <CardValue>$30,000</CardValue>
              <CardMeta>
                <div>
                  <span>Requested</span>
                  <strong>30%</strong>
                </div>
                <div>
                  <span>Available</span>
                  <strong>70%</strong>
                </div>
              </CardMeta>
            </StackCard>
            <StackCard $offset={1} />
            <StackCard $offset={2} />
          </CardStack>
        </Graphic>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 6rem 10% 5rem;
  background-color: #faf9f5;
  border-bottom: 1px solid #e8e6dc;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: clamp(2rem, 6vw, 4rem);
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1 1 340px;
  text-align: left;

  @media (max-width: 900px) {
    text-align: left;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 4.2vw, 2.8rem);
  line-height: 1.25;
  margin: 0 0 1rem;
`;

const Accent = styled.span`
  color: #d97757;
`;

const Subtitle = styled.p`
  max-width: 580px;
  margin: 0 0 1.75rem;
  color: #4b4a45;
  font-size: 1.02rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Primary = styled.a`
  background-color: #141413;
  color: #faf9f5;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &:hover {
    background-color: #262522;
  }
`;

const Secondary = styled.a`
  border: 1px solid #e8e6dc;
  color: #4b4a45;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  &:hover {
    border-color: #141413;
    color: #141413;
  }
`;

const Graphic = styled.div`
  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
  padding: 2.2rem 2rem;
  border-radius: 24px;
  background-color: #f4f1ea;
  border: 1px solid #e8e6dc;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.06);
`;

const CardStack = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 220px;
  display: flex;
  justify-content: center;
`;

interface StackCardProps {
  $offset?: number;
}

const StackCard = styled.div<StackCardProps>`
  position: absolute;
  inset: 0;
  margin: auto;
  background-color: #faf9f5;
  border: 1px solid #e8e6dc;
  border-radius: 18px;
  padding: 1.5rem;
  display: grid;
  gap: 1.2rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.05);
  transform: ${({ $offset = 0 }) => `translateY(${14 * $offset}px)`};
  opacity: ${({ $offset = 0 }) => ($offset === 0 ? 1 : $offset === 1 ? 0.9 : 0.8)};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardPill = styled.span`
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background-color: #e8e6dc;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Status = styled.span`
  font-size: 0.78rem;
  color: #d97757;
  font-weight: 600;
`;

const CardValue = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: grid;
    gap: 0.2rem;
    font-size: 0.82rem;
    color: #4b4a45;
  }

  strong {
    font-size: 1rem;
    color: #141413;
  }
`;
