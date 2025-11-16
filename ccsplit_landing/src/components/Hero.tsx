import { Star } from 'lucide-react';
import { Button } from './ui/button';
export function Hero() {
  return (
    <section className="bg-[#1a1a1a] text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-block bg-[#2a2a2a] px-4 py-2 rounded-full text-sm">
              Welcome to Credit Card Splits
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Working Capital That Flows With Your Sales
            </h1>
            <p className="text-gray-300 text-lg">
              Unlock instant cash flow without the hassle of traditional loans. Our credit card splits 
              seamlessly integrate with your business operations to provide flexible funding based on your sales.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#c4ff1a] text-black hover:bg-[#b3e617] font-semibold px-8 py-6 text-lg">
                Get Started Now
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#c4ff1a] text-[#c4ff1a]" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">4.9 of 5</div>
                  <div className="text-gray-400">Based on 1,200+ customers</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white text-black p-6 rounded-lg">
                <img 
                  src="https://www.creditcardsplits.com/static/InstantAc.png" 
                  alt="Icon Money Bag"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-xl mb-2">Instant Access</h3>
                <p className="text-gray-600 text-sm">
                  Get approved in minutes and access funds immediately
                </p>
              </div>
              <div className="bg-white text-black p-6 rounded-lg">
                <img 
                  src="https://www.creditcardsplits.com/static/Automated.png" 
                  alt="Icon Mobile Network"
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-bold text-xl mb-2">Automated Splits</h3>
                <p className="text-gray-600 text-sm">
                  Repayments automatically deduct from your card transactions
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763332150220-4afd086f-4b91-4976-b773-99578a3ff762-screenshot.jpg"
              alt="Hero Visual"
              className="hidden"
            />
            <div className="relative">
              <img 
                src="https://www.creditcardsplits.com/static/new/images/hero/hero_shape_1.svg"
                alt="Hero Shape"
                className="absolute inset-0 w-full h-full"
              />
              <img 
                src="https://www.creditcardsplits.com/static/new/images/hero/hero_hand_image.png"
                alt="Hand Image"
                className="relative z-10 w-full"
              />
              <img 
                src="https://www.creditcardsplits.com/static/cc.png"
                alt="Credit Card"
                className="absolute top-1/4 right-0 w-64 transform rotate-12 z-20"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#c4ff1a] opacity-20 blur-3xl rounded-full"></div>
    </section>
  );
}