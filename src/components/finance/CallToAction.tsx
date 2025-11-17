import { Button } from './ui/button';
export default function CallToAction() {
  return (
    <section className="py-20 bg-[#1a2332] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          It's time to try Plastiq. Pay the way you want.
        </h2>
        <p className="text-xl mb-8">
          Get the funding you need.
        </p>
        <Button className="bg-[#d4ff00] text-[#1a2332] hover:bg-[#c4ef00] font-semibold px-8 py-6 text-lg mb-4">
          get started
        </Button>
        <p className="text-sm text-gray-400">
          By registering, you agree to Plastiq's{' '}
          <a href="#" className="text-[#d4ff00] hover:underline">terms of service</a>
          {' '}and{' '}
          <a href="#" className="text-[#d4ff00] hover:underline">privacy policy</a>.
        </p>
      </div>
    </section>
  );
}