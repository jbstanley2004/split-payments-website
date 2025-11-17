import { Button } from './ui/button';
export function ExpandSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-[#0a1929] to-[#0f1f2e]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
          Expand your customer experience.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            size="lg"
            className="bg-[#ff6b35] hover:bg-[#ff5520] text-white px-8"
          >
            Get Started
          </Button>
          <Button 
            size="lg"
            variant="link"
            className="text-white hover:text-white/80"
          >
            Request a Demo →
          </Button>
        </div>
      </div>
    </section>
  );
}