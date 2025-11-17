import { Button } from '@/components/ui/button';
export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#000000] via-[#0a0a1a] to-[#1a1a3a] pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-4">
              BUSINESS INTELLIGENCE AND REPORTING
            </p>
            <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight mb-6">
              TURN DATA INTO<br />
              ACTIONABLE<br />
              INSIGHTS
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Access real-time transaction data, export reports, and analyze merchant operations with Shift4's robust business intelligence and reporting capabilities.
            </p>
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-6 text-lg">
              Contact Us
            </Button>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763318978455-9831ef6f-85c9-4e0c-a7b6-ce070ca48049-screenshot.jpg"
                alt="Business Intelligence Dashboard"
                className="w-full max-w-lg mx-auto transform hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/20 to-[#7c3aed]/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}