import { Button } from './ui/button';
export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/id/1005/1920/800" 
          alt="Hero Background" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f2e]/90 to-[#0f1f2e]/50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Payments Deep Dive: Retail and Ecommerce
          </h1>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Take a beautiful look at the state of payments. We share the latest trends and the direct others you can add to the opportunity and growth with legacies.
          </p>
          <Button className="bg-[#00b8d9] text-white hover:bg-[#00a0c0] px-8 py-6 text-lg">
            Read now
          </Button>
        </div>
      </div>
    </section>
  );
}