import { Button } from './ui/button';
export function HeroSection() {
  return (
    <section className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Path to Financial Success Starts Here
            </h1>
            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                <span className="font-semibold text-white">Independent Sales Organizations (ISOs)</span> — Partner with Credit Card Splits — Empower Your Business!
              </p>
              <p className="text-gray-300">
                We provide Independent Sales Organizations (ISOs) with cutting-edge tools, personalized support to drive your sales and maximize your earning!
              </p>
            </div>
            <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold text-lg px-8 py-6">
              Book a Demo
            </Button>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://www.creditcardsplits.com/static/ISOsbanner.png" 
                alt="financial consulting" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}