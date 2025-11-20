import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Import merged Verifone / POS hardware data (includes specs + brand/category)
import rawHardwareData from '../../verifone_hardware_w_descriptions.json';
// Import separate image mapping (often more reliable / up to date URLs)
import imageUrlData from '../../hardwaree_image_urls.json';

type HardwareItem = {
  image?: string;
  model: string;
  brand?: string;
  category?: string;
  features?: Record<string, string>;
  specs?: Record<string, string>;
};

// Build a lookup from model -> image URL using the Shopify CDN list,
// falling back to the image in the specs JSON if we do not find a match.
const imageUrlByModel: Record<string, string> = (imageUrlData as any[]).reduce(
  (acc, item) => {
    if (item.model && item.image) {
      acc[item.model.trim()] = item.image;
    }
    return acc;
  },
  {} as Record<string, string>
);

const hardwareData: HardwareItem[] = (rawHardwareData as any[]).map((item) => {
  const model = String(item.model || '').trim();
  const primaryImage = imageUrlByModel[model];

  return {
    ...item,
    // Prefer CDN image if we have one mapped by model, otherwise fallback to the
    // image field from the specs JSON.
    image: primaryImage || item.image,
  };
});

const HardwareSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!hardwareData.length) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hardwareData.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (!hardwareData.length) {
    return (
      <div className="text-center text-red-500">
        No hardware data to display.
      </div>
    );
  }

  const currentHardware = hardwareData[currentIndex];

  if (!currentHardware) return null;

  const imageSrc = currentHardware.image;

  return (
    <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={currentHardware.model}
              width={400}
              height={400}
              className="object-contain rounded-lg"
              // Keep unoptimized to avoid surprises with remote hosts, we already
              // whitelist cdn.shopify.com and cardmachineoutlet in next.config.mjs.
              unoptimized
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-500 border border-dashed border-gray-700">
              Image not available
            </div>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          {currentHardware.brand && (
            <h2 className="text-3xl font-bold mb-2">{currentHardware.brand}</h2>
          )}
          <h3 className="text-xl text-gray-400 mb-4">{currentHardware.model}</h3>
          {currentHardware.category && (
            <p className="text-lg mb-6 bg-gray-800 px-4 py-2 rounded-md self-start">
              {currentHardware.category}
            </p>
          )}

          {currentHardware.specs &&
            Object.keys(currentHardware.specs).length > 0 && (
              <div>
                <h4 className="text-2xl font-semibold mb-3">Specifications</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(currentHardware.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-gray-700 py-1"
                    >
                      <span className="font-medium text-gray-300">{key}:</span>
                      <span className="text-gray-400">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div
          className="h-1 bg-blue-500"
          style={{ animation: `progress ${5}s linear infinite` }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HardwareSpotlight;
