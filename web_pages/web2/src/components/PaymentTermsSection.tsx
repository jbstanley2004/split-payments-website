import { Button } from './ui/button';
export function PaymentTermsSection() {
  const features = [
    {
      icon: 'M12 4.5v15m7.5-7.5h-15',
      title: 'Empower your sales team.',
      description: 'Give your teams the confidence to close deals by pairing payment options with flexible payment terms.'
    },
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      title: 'Maintain your margins.',
      description: 'Prevent payment delays and costly invoices by allowing your customers to pay with their preferred payment method.'
    },
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      title: 'Fast, secure payments.',
      description: 'Built with innovative payment rails with bank-level security and best-in-class protection.'
    }
  ];
  return (
    <section className="py-20 px-6 bg-[#0f1f2e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#ff6b35] text-sm font-semibold mb-4 uppercase tracking-wide">
            GIVE YOUR CUSTOMERS OPTIONS
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Your payments, your terms. Their payments, their terms.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            All the convenience of accepting credit cards with the best rates for you and your customers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <svg className="w-8 h-8 text-[#ff6b35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#ff6b35] hover:bg-[#ff5520] text-white px-8"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}