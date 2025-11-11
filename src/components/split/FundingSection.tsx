"use client";

import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const industryPhotos = [
  "/industries/car_repair.webp",
  "/industries/clothing.webp",
  "/industries/convenience_store.webp",
  "/industries/franchise.webp",
  "/industries/hair_beauty.webp",
  "/industries/home_goods_furniture.webp",
  "/industries/hotels.webp",
  "/industries/pharmacy.webp",
  "/industries/professional_services.webp",
  "/industries/restaurants.webp",
];

export function FundingSection() {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimationControls();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const duration = isMobile ? 40 : 30;

  // Start carousel animation
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, duration]);

  // Pause / resume on hover
  const handleMouseEnter = () => {
    if (!isMobile) controls.stop();
  };
  const handleMouseLeave = () => {
    if (!isMobile)
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
  };
  return (
    <Wrap id="funding">
      <Inner>
        <Copy>
          <Heading>
            Access fast, flexible capital — powered by your sales
          </Heading>
          <Text>
            With <strong>Credit Card Splits</strong>, your business receives
            upfront cash based on future card sales. No fixed monthly minimums.
            Repay as a small, fixed percentage of daily volume.
          </Text>

          <List>
            <li>Pre-approved offers from your processing history</li>
            <li>Automated remittance directly from card sales</li>
            <li>No personal guarantees or hard credit checks</li>
            <li>Funding in as little as 24 hours</li>
          </List>

          <CTA href="#get-started">See your funding options</CTA>
        </Copy>

        <Graphic
          aria-hidden="true"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContainer>
            <motion.div
              style={{
                display: "flex",
                gap: "1rem",
              }}
              animate={controls}
            >
              {[...industryPhotos, ...industryPhotos].map((src, i) => (
                <CarouselImage key={i}>
                  <Image
                    src={src}
                    alt={`Industry ${(i % industryPhotos.length) + 1}`}
                    width={180}
                    height={220}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </CarouselImage>
              ))}
            </motion.div>
          </CarouselContainer>
          <EdgeGradientLeft />
          <EdgeGradientRight />
          <OfferCard>
            <OfferAmount>
              <strong>$18,000</strong>
              <span>Capital offer</span>
            </OfferAmount>
            <Range>
              <RangeTrack>
                <RangeFill style={{ width: "72%" }} />
                <RangeThumb style={{ left: "72%" }} />
              </RangeTrack>
              <RangeLabels>
                <span>$500</span>
                <span>$180,000</span>
              </RangeLabels>
            </Range>
            <OfferCaption>
              Just an example. Your offer amount is based on your business data.
            </OfferCaption>
          </OfferCard>
          <Pulse />
        </Graphic>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 6rem 10%;
  background: ${({ theme }) => theme.colors.surface};
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  gap: clamp(2rem, 6vw, 4rem);
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Copy = styled.div`
  flex: 1 1 340px;
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
  max-width: 760px;
  margin: 0 0 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    color: #fff;
  }
`;

const Graphic = styled.div`
  position: relative;
  flex: 1 1 320px;
  max-width: 520px;
  padding: 4.5rem 2.4rem;
  border-radius: 36px;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06), transparent 65%)
      rgba(12, 12, 12, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  opacity: 0.4;
  z-index: 0;
`;

const CarouselImage = styled.div`
  flex-shrink: 0;
  width: 140px;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  }
`;

const EdgeGradientLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  background: linear-gradient(
    to right,
    rgba(12, 12, 12, 0.95) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
`;

const EdgeGradientRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80px;
  background: linear-gradient(
    to left,
    rgba(12, 12, 12, 0.95) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
`;

const OfferCard = styled.div`
  position: relative;
  margin: 0 auto;
  background: #f7f7f7;
  color: #0d0d0d;
  border-radius: 26px;
  padding: 2.2rem 2rem;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 35px 60px rgba(0, 0, 0, 0.45);
  z-index: 2;
`;

const OfferAmount = styled.div`
  display: grid;
  gap: 0.4rem;

  strong {
    font-size: 2.4rem;
    font-weight: 800;
  }

  span {
    color: #5e5e5e;
    font-size: 0.95rem;
  }
`;

const Range = styled.div`
  display: grid;
  gap: 0.75rem;
  margin: 1.6rem 0 0;
`;

const RangeTrack = styled.div`
  position: relative;
  height: 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
`;

const RangeFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #ffb066 0%, #ff593d 100%);
`;

const RangeThumb = styled.div`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #121212;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6a6a6a;
`;

const OfferCaption = styled.p`
  margin: 1.2rem 0 0;
  font-size: 0.85rem;
  color: #808080;
`;

const Pulse = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  bottom: -60px;
  right: -60px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%);
  z-index: 1;
`;
