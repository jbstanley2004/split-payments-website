"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Consolidate all cards with local paths
const CARDS = [
  // AMEX
  { name: "The Platinum Card", src: "/cards/amex.png" },
  { name: "Aeroplan Reserve Card", src: "/cards/Amex2.png" },
  { name: "Marriott Bonvoy Card", src: "/cards/amex3.png" },
  { name: "Business Platinum Card", src: "/cards/amex.png" },
  { name: "Aeroplan Business Reserve Card", src: "/cards/Amex2.png" },
  { name: "Amex Cobalt Card", src: "/cards/amex3.png" },
  { name: "Gold Rewards Card", src: "/cards/amex.png" },
  { name: "Business Gold Rewards Card", src: "/cards/Amex2.png" },
  { name: "Marriott Bonvoy Business Card", src: "/cards/amex3.png" },
  { name: "Aeroplan Card", src: "/cards/amex.png" },
  { name: "Green Card", src: "/cards/Amex2.png" },
  { name: "SimplyCash Preferred Card", src: "/cards/amex3.png" },
  { name: "SimplyCash Card", src: "/cards/amex.png" },
  { name: "Essential Credit Card", src: "/cards/Amex2.png" },
  // VISA
  { name: "Prime Visa", src: "/cards/visa.png" },
  { name: "Chase Freedom Unlimited", src: "/cards/Visa2.png" },
  { name: "Fizz Credit-Building Visa", src: "/cards/visa3.png" },
  { name: "Ramp Business Card", src: "/cards/visa.png" },
  { name: "The secured Self Visa", src: "/cards/Visa2.png" },
  { name: "Chase Freedom Rise", src: "/cards/visa3.png" },
  { name: "Ink Business Unlimited", src: "/cards/visa.png" },
  { name: "Revenued Business Card", src: "/cards/Visa2.png" },
  { name: "Chase Sapphire Preferred", src: "/cards/visa3.png" },
  { name: "Ink Business Cash", src: "/cards/visa.png" },
  { name: "opensky Launch Secured", src: "/cards/Visa2.png" },
  { name: "USAA Preferred Cash Rewards", src: "/cards/visa3.png" },
  { name: "Credit One Bank Platinum", src: "/cards/visa.png" },
  { name: "Sapphire Reserve for Business", src: "/cards/Visa2.png" },
  { name: "Varo Believe Secured", src: "/cards/visa3.png" },
  { name: "BILL Divvy Corporate Card", src: "/cards/visa.png" },
  { name: "Chase Sapphire Reserve", src: "/cards/Visa2.png" },
  { name: "opensky Plus Secured", src: "/cards/visa3.png" },
  { name: "opensky Secured", src: "/cards/visa.png" },
  { name: "Revvi Card", src: "/cards/Visa2.png" },
  { name: "Imagine Visa", src: "/cards/visa3.png" },
  { name: "Upgrade Triple Cash Rewards", src: "/cards/visa.png" },
  { name: "cashRewards", src: "/cards/Visa2.png" },
  { name: "Upgrade Cash Rewards", src: "/cards/visa3.png" },
  { name: "Platinum", src: "/cards/visa.png" },
  { name: "Sony Visa", src: "/cards/Visa2.png" },
  { name: "Total Visa", src: "/cards/visa3.png" },
  { name: "Coast Fuel Card", src: "/cards/visa.png" },
  { name: "Edenred Essentials", src: "/cards/Visa2.png" },
  { name: "Visa Signature Flagship", src: "/cards/visa3.png" },
  { name: "GO REWARDS", src: "/cards/visa.png" },
  { name: "Chime Card", src: "/cards/Visa2.png" },
  // MASTERCARD
  { name: "Citi Double Cash", src: "/cards/MasterCard2.png" },
  { name: "Capital One Platinum", src: "/cards/masterCard3.png" },
  { name: "Capital One QuicksilverOne", src: "/cards/MasterCard2.png" },
  { name: "Capital One Savor Student", src: "/cards/masterCard3.png" },
  { name: "Citi Strata Premier", src: "/cards/MasterCard2.png" }
];

const Column = ({ cards, duration, yOffset = 0 }: { cards: typeof CARDS, duration: number, yOffset?: number }) => {
  // Calculate height of one set of cards: (126px height + 32px gap) * num_cards
  // We use a fixed rough estimate or calculation. 15 cards * 158px = ~2370px
  const oneCycleHeight = cards.length * (126 + 32); 

  return (
    <div className="relative w-full h-[150vh] overflow-hidden">
      <motion.div
        initial={{ y: yOffset }}
        animate={{ y: yOffset - oneCycleHeight }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-8 items-center"
      >
        {/* Repeat cards multiple times to ensure infinite scroll coverage */}
        {[...cards, ...cards, ...cards, ...cards].map((card, idx) => (
          <div 
            key={`${card.name}-${idx}`} 
            className="relative w-[200px] h-[126px] flex-shrink-0 transform rotate-12 opacity-80 hover:opacity-100 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer"
          >
            <Image
              src={card.src}
              alt={card.name}
              fill
              className="object-contain drop-shadow-lg"
              sizes="200px"
              unoptimized
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function FundingWaterfall() {
  // Split cards into 3 columns
  const col1 = CARDS.slice(0, 15);
  const col2 = CARDS.slice(15, 30);
  const col3 = CARDS.slice(30);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 opacity-60">
      {/* Gradient Overlay at top and bottom for smooth fade in/out */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="grid grid-cols-3 gap-4 md:gap-8 h-full w-[120%] -ml-[10%] -rotate-6 transform">
        <Column cards={col1} duration={35} yOffset={-100} />
        <Column cards={col2} duration={45} yOffset={-300} />
        <Column cards={col3} duration={40} yOffset={-500} />
      </div>
    </div>
  );
}
