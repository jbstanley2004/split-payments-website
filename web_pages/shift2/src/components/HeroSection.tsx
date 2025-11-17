import { Button } from './ui/button';
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#162847] to-[#1e3a5f] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            ELEVATE YOUR<br />
            CHECKOUT<br />
            EXPERIENCE TO<br />
            MAXIMIZE SALES
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Continue a different checkout process for each and every business model and maximize sales with flexible payment options.
          </p>
          <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-6 text-lg">
            Get Started Today
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763318661359-9831ef6f-85c9-4e0c-a7b6-ce070ca48049-screenshot.jpg" 
              alt="Checkout illustration" 
              className="w-full max-w-md"
              style={{ filter: 'brightness(0) invert(1)', mixBlendMode: 'screen' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}