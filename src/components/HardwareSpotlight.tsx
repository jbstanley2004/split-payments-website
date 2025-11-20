import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import productsData from '../data/products-data.json';

const HardwareSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentHardware = productsData[currentIndex];

  if (!currentHardware) {
    return null;
  }

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
        </div>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div
          className="h-1 bg-blue-500"
          style={{ animation: `progress ${5}s linear infinite` }}
        ></div>
      </div>
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HardwareSpotlight;