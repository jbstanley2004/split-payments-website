"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import productsData from '../data/products-data.json';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HardwareSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (productsData.length === 0) return;
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % productsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + productsData.length) % productsData.length);
  };

  if (productsData.length === 0) {
    return <div className="text-center text-red-500">No hardware data to display.</div>;
  }

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
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center min-h-[500px]">

        {/* Left Column: Image */}
        <div className="relative h-[400px] w-full flex items-center justify-center bg-gray-100/5 rounded-[3rem] p-8 group">
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
              <div className="relative w-full h-full">
                <Image
                  src={currentHardware.image}
                  alt={`${currentHardware.make} ${currentHardware.model}`}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons (Floating) */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
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
                <span className="px-3 py-1 rounded-full bg-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {currentHardware.make}
                </span>
                {/* Placeholder for category if we had it, or maybe price? */}
                {currentHardware.price && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {currentHardware.price}
                  </span>
                )}
              </div>

              <h3 className="text-5xl font-medium text-white mb-6 leading-tight">
                {currentHardware.model}
              </h3>

              <div className="space-y-6">
                <div className="h-px w-full bg-white/10" />

                <div className="text-gray-300 leading-relaxed">
                  {currentHardware.description}
                </div>

                <div className="h-px w-full bg-white/10" />
              </div>

              {currentHardware.productUrl && (
                <div className="mt-8 pt-4">
                  <a
                    href={currentHardware.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
                  >
                    View Details
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            {productsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
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