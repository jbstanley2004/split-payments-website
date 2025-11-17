import { Check } from 'lucide-react';
export default function MakeBigBets() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-80 h-80 mx-auto">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/09/register.png"
                alt="Construction worker"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1a2332]">
              Make big bets
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg"
                  alt="check"
                  className="w-6 h-6 mt-1"
                />
                <p className="text-gray-700">
                  Extend time to pay off your business expenses up to 90 days.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg"
                  alt="check"
                  className="w-6 h-6 mt-1"
                />
                <p className="text-gray-700">
                  Get funding fast with eligibility decisions instantly for lines up to $100K. Qualified businesses can get up to $750K with additional review.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg"
                  alt="check"
                  className="w-6 h-6 mt-1"
                />
                <p className="text-gray-700">
                  Competitive rates, transparent fees, and no collateral required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}