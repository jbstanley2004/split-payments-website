import { Button } from './ui/button';
export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1a2332] mb-4">
            Pay by credit card.<br />
            Vendors get paid the way they want.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Unlock better cash flow, earn rewards on every payment, and simplify vendor payments — all while your vendors receive their preferred payment method.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-base">
              Get started
            </Button>
            <Button variant="outline" className="px-8 py-6 text-base">
              Learn more ›
            </Button>
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <img 
            src="https://live-pq2021.pantheonsite.io/wp-content/uploads/2023/03/HeroComp-updated.svg" 
            alt="Product interface"
            className="w-full"
          />
        </div>
        <div className="mt-12 flex items-center justify-center">
          <img 
            src="https://www.plastiq.com/wp-content/uploads/2025/01/hero-logos.svg" 
            alt="Partner logos"
            className="max-w-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
}