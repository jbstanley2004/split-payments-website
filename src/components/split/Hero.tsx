"use client";

import styled from "styled-components";
import { ThickButton } from "@/components/ThickButton";
import { LogoIcon } from "@/components/logo-icon";

export function Hero() {
  return (
    <Wrap id="hero">
      <Inner>
        <Content>
          <Title>
            Accept payments. Access capital. <Accent>Grow with Split.</Accent>
          </Title>
          <Subtitle>
            Flexible merchant funding and payment services built for high-growth
            businesses. Get approved in minutes and repay automatically from
            your card sales.
          </Subtitle>
          <Actions>
            <ThickButton href="#get-started" thickness={50} travel={40} tilt={10}>
              <>Let's <LogoIcon /></>
            </ThickButton>
          </Actions>
        </Content>

        <Graphic aria-hidden="true">
          <Glow />
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
          <CardBase />
        </Graphic>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 8rem 10% 6rem;
  background: radial-gradient(
      1200px 600px at 20% -10%,
      #151515 0%,
      #0b0b0b 50%,
      #000 100%
    )
    #000;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: clamp(2rem, 6vw, 4rem);
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1 1 340px;
  text-align: left;

  @media (max-width: 900px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  line-height: 1.15;
  margin: 0 0 1rem;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.p`
  max-width: 620px;
  margin: 0 0 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.15rem;

  @media (max-width: 900px) {
    margin: 0 auto 2rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Primary = styled.a`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  padding: 0.95rem 1.6rem;
  border-radius: 10px;
  font-weight: 800;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
  }
`;

const Secondary = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0.95rem 1.4rem;
  border-radius: 10px;
  font-weight: 700;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Graphic = styled.div`
  position: relative;
  flex: 1 1 320px;
  max-width: 420px;
  padding: 2.6rem 2.4rem 3rem;
  border-radius: 30px;
  background: linear-gradient(165deg, #141414 0%, #050505 75%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-shadow: 0 45px 120px rgba(0, 0, 0, 0.55);
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 90% at 50% 10%, rgba(255, 88, 61, 0.35), transparent);
  opacity: 0.9;
`;

const CardStack = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 260px;
  display: flex;
  justify-content: center;
`;

type StackCardProps = {
  $offset?: number;
};

const StackCard = styled.div<StackCardProps>`
  position: absolute;
  inset: 0;
  margin: auto;
  background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 1.8rem;
  display: grid;
  gap: 1.4rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  transform: ${({ $offset = 0 }) => `translateY(${18 * $offset}px) scale(${1 - $offset * 0.04})`};
  opacity: ${({ $offset = 0 }) => ($offset === 0 ? 1 : $offset === 1 ? 0.85 : 0.7)};
  filter: ${({ $offset = 0 }) => ($offset === 0 ? "none" : "blur(0.2px)")};
  z-index: ${({ $offset = 0 }) => 3 - $offset};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardPill = styled.span`
  font-size: 0.75rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Status = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

const CardValue = styled.div`
  font-size: 2.4rem;
  font-weight: 800;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: grid;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-size: 1rem;
    color: #fff;
  }
`;

const CardBase = styled.div`
  position: absolute;
  width: 150%;
  height: 120px;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.4;
`;
