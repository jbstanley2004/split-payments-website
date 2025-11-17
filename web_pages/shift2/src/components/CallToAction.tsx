import { Button } from './ui/button';
export default function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#1a2f5c] to-[#2940a3] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Want to Learn More?
        </h2>
        <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
          Contact Us
        </Button>
      </div>
    </section>
  );
}