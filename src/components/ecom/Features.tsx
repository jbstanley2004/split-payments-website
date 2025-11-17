import { Check } from 'lucide-react';
export function Features() {
  const leftFeatures = [
    'Automated approvals',
    'Streamlined payment process',
    'Pay suppliers faster',
    'Extend cash on hand'
  ];
  const rightFeatures = [
    'Easy international payments',
    'Cash flow monitoring',
    'Searchable history',
    'Greater incentive visibility'
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#0f1f2e] mb-12 max-w-2xl">
          Use Plastiq Pay and get more from your payments.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="space-y-4">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" 
                  alt="" 
                  className="w-5 h-5 mt-1"
                />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img 
                  src="https://www.plastiq.com/wp-content/uploads/2021/04/tick.svg" 
                  alt="" 
                  className="w-5 h-5 mt-1"
                />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}