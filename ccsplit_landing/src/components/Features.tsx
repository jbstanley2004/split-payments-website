import { DollarSign, Clock, Shield, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
export function Features() {
  const features = [
    {
      icon: DollarSign,
      title: 'No Collateral',
      description: 'Access funding without putting your assets at risk. No personal guarantees required.',
    },
    {
      icon: Clock,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no hidden charges. Know exactly what you pay upfront.',
    },
    {
      icon: Shield,
      title: 'Fast Approval',
      description: 'Get approved in as little as 24 hours. Quick and simple application process.',
    },
    {
      icon: TrendingUp,
      title: 'Flexible Repayments',
      description: 'Repayments automatically adjust with your sales volume. Pay less when sales are slow.',
    },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            OUR SOLUTIONS
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Smarter Working Capital,<br />Seamless Repayments
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://www.creditcardsplits.com/static/SeamlessRepayments.png"
              alt="Funding Dashboard"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Funding That Works With You</h3>
            <p className="text-gray-600 mb-8">
              With credit card splits, you get instant access to working capital that flows with your business. 
              No fixed monthly payments, no stress. Your repayments automatically adjust based on your daily sales.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="bg-[#c4ff1a] w-12 h-12 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <Button className="mt-8 bg-black text-white hover:bg-gray-800 px-8 py-6">
              Apply for Funding
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}