import { Button } from './ui/button';
const CallToAction = () => {
  return (
    <section className="py-20 bg-[#0066FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          READY TO GET STARTED?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join thousands of businesses already using Shift4 to power their commerce
        </p>
        <Button 
          size="lg"
          className="bg-white text-[#0066FF] hover:bg-gray-100 px-12 py-6 text-lg font-semibold"
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
};
export default CallToAction;