import { Button } from './ui/button';
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img 
          src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763317991145-9831ef6f-85c9-4e0c-a7b6-ce070ca48049-screenshot.jpg"
          alt="Digital network background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 via-[#000000]/70 to-[#000000]"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          EXPERIENCE<br />
          THE FUTURE<br />
          OF COMMERCE
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Accept payments everywhere with Shift4's end-to-end commerce solutions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6 text-lg">
            Get Started Today
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
            Watch Our Demo
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Hero;