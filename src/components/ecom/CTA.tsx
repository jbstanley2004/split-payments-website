import { Button } from './ui/button';
export function CTA() {
  return (
    <section className="py-20 bg-[#0f1f2e]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Think Plastiq Pay is right for your business?
        </h2>
        <p className="text-white/80 mb-8">
          See how Plastiq Pay could support your processes.
        </p>
        <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0f1f2e] px-8 py-6">
          Get started
        </Button>
        <p className="text-white/60 text-sm mt-6">
          Already a customer? Log in to get started
        </p>
      </div>
    </section>
  );
}