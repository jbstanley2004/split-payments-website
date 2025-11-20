import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import productsData from '../data/products-data.json';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// This data is a result of merging the spec file with the image URL file.
// Only items with a confident image URL match have been included.
const hardwareData = [
  {
    "image": "https://www.cardmachineoutlet.com/1_778b0f4c-bb86-4496-be87-5744307812c0_grande.png",
    "model": "Desk 3500",
    "brand": "Ingenico",
    "category": "Terminal",
    "features": {
      "Ethernet": "Yes"
    },
    "specs": {
      "Connectivity": "Ethernet / Dial",
      "Display": "Color LCD",
      "Security": "PCI PTS 5.x"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_4757932c-252f-43c4-a1eb-73d7c7903cdc_grande.png",
    "model": "Lane 5000",
    "brand": "Ingenico",
    "category": "PIN Pad",
    "features": {
      "EMV Chip": "Yes"
    },
    "specs": {
      "Display": "3.5\" Color Touch",
      "Security": "PCI PTS 5.x",
      "Capture": "Signature"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_f0a36db0-2bfa-4e13-b1a2-bc9927dadc43_grande.png",
    "model": "Lane 7000",
    "brand": "Ingenico",
    "category": "PIN Pad",
    "features": {
      "EMV Chip": "Yes"
    },
    "specs": {
      "Display": "5\" Color Touch",
      "Security": "PCI PTS 5.x",
      "Connectivity": "Ethernet / USB"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_54a3577a-ef9c-49de-8b04-4beb35d8ca1a_grande.png",
    "model": "Link 2500",
    "brand": "Ingenico",
    "category": "Mobile",
    "features": {
      "Wi-Fi": "Yes",
      "Bluetooth": "Yes"
    },
    "specs": {
      "Connectivity": "Wi-Fi / Bluetooth",
      "Battery": "1200mAh",
      "Weight": "Lightweight"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_6e61f0bf-9357-4f04-8fa9-56bd4d7a115a_grande.png",
    "model": "Move 5000",
    "brand": "Ingenico",
    "category": "Mobile",
    "features": {
      "Wi-Fi": "Yes",
      "Cellular": "4G",
      "Bluetooth": "Yes"
    },
    "specs": {
      "Connectivity": "4G / Wi-Fi / BT",
      "Display": "3.5\" Color Touch",
      "Printer": "Integrated Thermal"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_a5cf0fda-33a0-403e-9b2c-cbcbd9722837_grande.png",
    "model": "VX520",
    "brand": "Verifone",
    "category": "Countertop",
    "features": {
      "Ethernet": "Yes"
    },
    "specs": {
      "Connectivity": "Dial / Ethernet",
      "Processor": "400MHz ARM11",
      "Security": "PCI PTS 3.x"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_3f0d02f3-02e5-4a72-a5f1-0435f44e1ef6_grande.png",
    "model": "A920 Pro",
    "brand": "PAX",
    "category": "Smart Mobile",
    "features": {
      "Wi-Fi": "Yes",
      "Cellular": "4G",
      "Bluetooth": "Yes"
    },
    "specs": {
      "OS": "Android",
      "Display": "5.5\" HD Touch",
      "Camera": "Rear & Front"
    }
  },
  {
    "image": "https://www.cardmachineoutlet.com/1_7f2c6b1a-2f69-4c93-9f86-7a2b3f2e5a1d_grande.png",
    "model": "Flex",
    "brand": "Clover",
    "category": "Smart Mobile",
    "features": {
      "Wi-Fi": "Yes",
      "Cellular": "LTE"
    },
    "specs": {
      "Display": "5\" HD Touch",
      "Connectivity": "LTE / Wi-Fi",
      "Feature": "Built-in Printer"
    }
  }
];

const HardwareSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (productsData.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (productsData.length === 0) {
    return <div className="text-center text-red-500">No hardware data to display.</div>;
  }
      nextSlide();
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % hardwareData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + hardwareData.length) % hardwareData.length);
  };

  if (hardwareData.length === 0) return null;

  const currentHardware = productsData[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex items-center justify-center bg-white/5 rounded-lg p-4">
          <div className="relative w-full h-[300px]">
            <Image
              src={currentHardware.image}
              alt={`${currentHardware.make} ${currentHardware.model}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">{currentHardware.make}</h2>
          <h3 className="text-xl text-gray-400 mb-4">{currentHardware.model}</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-300">Description</h4>
            <p className="text-gray-400 leading-relaxed">
              {currentHardware.description}
            </p>
          </div>

          {currentHardware.price && (
             <div className="mt-auto">
               <span className="text-2xl font-bold text-blue-400">{currentHardware.price}</span>
             </div>
          )}
          
          {currentHardware.productUrl && (
            <a 
              href={currentHardware.productUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors self-start"
            >
              View Details
            </a>
          )}
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center min-h-[500px]">

        {/* Left Column: Image */}
        <div className="relative h-[400px] w-full flex items-center justify-center bg-brand-gray/5 rounded-[3rem] p-8 group">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "circOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentHardware.image}
                alt={currentHardware.model}
                width={500}
                height={500}
                className="object-contain max-h-[320px] w-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons (Floating) */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-black hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-black hover:bg-black hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-center space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-gray/10 text-xs font-semibold uppercase tracking-wider text-brand-black/60">
                  {currentHardware.brand}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-gray/10 text-xs font-semibold uppercase tracking-wider text-brand-black/60">
                  {currentHardware.category}
                </span>
              </div>

              <h3 className="text-5xl font-lora font-medium text-brand-black mb-6 leading-tight">
                {currentHardware.model}
              </h3>

              <div className="space-y-6">
                <div className="h-px w-full bg-brand-black/10" />

                <div className="grid grid-cols-1 gap-4">
                  {currentHardware.specs && Object.entries(currentHardware.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between group">
                      <span className="text-brand-black/50 font-medium">{key}</span>
                      <span className="text-brand-black font-semibold">{String(value)}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px w-full bg-brand-black/10" />
              </div>

              <div className="mt-8 pt-4">
                <p className="text-brand-black/70 leading-relaxed font-lora italic">
                  "Engineered for reliability and speed, the {currentHardware.model} is the perfect choice for high-volume merchants."
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            {hardwareData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-black' : 'w-2 bg-brand-black/20 hover:bg-brand-black/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareSpotlight;