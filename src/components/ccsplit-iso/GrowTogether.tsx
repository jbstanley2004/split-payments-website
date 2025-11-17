import { Button } from './ui/button';
export function GrowTogether() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1a3a3a] to-[#0a1a1a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's Grow Together
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Partner with us today to get access to powerful lending solutions, strong commission, and a reputation for transparency. Credit Card Splits is here to help you succeed.
        </p>
        <div className="space-y-4 mb-10 text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="text-[#c5ff00] mt-1">✓</div>
            <p className="text-gray-300">Accelerate faster closings + generate over fast credit</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-[#c5ff00] mt-1">✓</div>
            <p className="text-gray-300">Earning profit happened fast</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-[#c5ff00] mt-1">✓</div>
            <p className="text-gray-300">Transparent pricing & dedicated ISO support</p>
          </div>
        </div>
        <Button className="bg-[#c5ff00] text-black hover:bg-[#b3e600] font-semibold text-lg px-10 py-6">
          Become an ISO Spreely Today
        </Button>
      </div>
    </section>
  );
}