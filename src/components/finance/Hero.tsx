import { Button } from './ui/button';
export default function Hero() {
  return (
    <section className="relative bg-[#1a2332] text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://www.plastiq.com/wp-content/uploads/2022/09/Hero@2x.png"
          alt="Hero background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get instant access to working capital
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Plastiq Short-Term Financing gives you the funding you need to seize business opportunities.
          </p>
          <Button className="bg-[#d4ff00] text-[#1a2332] hover:bg-[#c4ef00] font-semibold px-8 py-6 text-lg">
            get started
          </Button>
        </div>
      </div>
    </section>
  );
}