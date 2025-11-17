import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
function Hero() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Data Into Actionable Insights
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-8">
              Empower your business with intelligent analytics and real-time reporting. Make data-driven decisions with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <a 
                href="https://www.producthunt.com/posts/coderocket?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-coderocket" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1033622&theme=light&t=1762107724575" 
                  alt="CodeRocket - Transform your ideas into production-ready web applications | Product Hunt" 
                  className="w-64 h-14"
                />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
              <img 
                src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/images/1763318978455-9831ef6f-85c9-4e0c-a7b6-ce070ca48049-screenshot.jpg" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;