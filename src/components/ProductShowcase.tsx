"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Product = {
  id: string;
  brand: string;
  model: string;
  image: string;
  features: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "ingenico-move",
    brand: "Ingenico",
    model: "Moby 5500",
    image: "/brand_images/products/ingenico/Ingenico-moby5500-contactless-card.png.webp",
    features: ["Contactless", "Bluetooth", "iOS & Android"],
  },
  {
    id: "verifone-v400",
    brand: "Verifone",
    model: "V400m",
    image: "/brand_images/products/verifone/svg14.svg",
    features: ["High-speed Printer", "NFC", "Robust Security"],
  },
  {
    id: "clover-flex",
    brand: "Clover",
    model: "Flex",
    image: "/brand_images/products/clover/POS Solutions for Food & Beverage Businesses _ Clover-4.svg",
    features: ["All-in-one", "Inventory Mgmt", "Fingerprint Login"],
  },
  {
    id: "pax-a920",
    brand: "PAX",
    model: "A920",
    image: "/brand_images/products/pax/svg0.svg",
    features: ["Android OS", "Dual Cameras", "Long Battery Life"],
  },
];

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Display Area - Clean White, No Gradients */}
        <div className="relative h-[500px] bg-white rounded-3xl flex items-center justify-center p-10 border border-gray-200 shadow-sm group">
           <motion.div
             key={activeProduct.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className="relative w-full h-full max-w-md z-10 flex items-center justify-center"
           >
             {/* Fallback to regular img tag if next/image fails for some reason, but next/image should work with these paths */}
             <div className="relative w-full h-full">
                 <Image
                    src={activeProduct.image}
                    alt={`${activeProduct.brand} ${activeProduct.model}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                 />
             </div>
           </motion.div>
        </div>

        {/* Selection / Info Area */}
        <div className="space-y-8">
            <div>
                <motion.div
                    key={activeProduct.id + "header"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="text-sm font-bold text-black mb-2 uppercase tracking-widest">Featured Hardware</div>
                    <h3 className="text-4xl font-bold text-black font-poppins mb-2">
                        {activeProduct.brand} <span className="text-gray-400 font-light">{activeProduct.model}</span>
                    </h3>
                </motion.div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-4">
                    {activeProduct.features.map((feat, i) => (
                        <motion.span 
                            key={feat} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wide"
                        >
                            {feat}
                        </motion.span>
                    ))}
                </div>
                <p className="text-black/80 font-lora text-lg leading-relaxed">
                    Experience the speed and reliability of {activeProduct.brand}'s latest hardware. 
                    Fully integrated with Split for seamless payments and instant funding access.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map((product) => (
                    <button
                        key={product.id}
                        onClick={() => setActiveProduct(product)}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${
                            activeProduct.id === product.id 
                                ? "border-black bg-black text-white" 
                                : "border-gray-200 bg-white text-black hover:border-black"
                        }`}
                    >
                        <div className={`w-10 h-10 relative rounded-lg p-1 ${activeProduct.id === product.id ? "bg-white" : "bg-gray-100"}`}>
                            <Image 
                                src={product.image} 
                                alt={product.brand} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <span className="font-bold font-poppins text-sm block">{product.brand}</span>
                            <span className="text-xs opacity-70 font-lora">{product.model}</span>
                        </div>
                        {activeProduct.id === product.id && (
                            <div className="absolute top-2 right-2 text-white">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
            
            <div className="pt-8 border-t border-gray-100">
                <a href="/get-started" className="inline-flex items-center gap-2 text-black font-bold hover:gap-4 transition-all group">
                    Order hardware <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}
