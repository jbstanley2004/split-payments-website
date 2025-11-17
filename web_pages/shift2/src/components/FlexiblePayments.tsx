import { Button } from './ui/button';
export default function FlexiblePayments() {
  const features = [
    {
      icon: 'https://cdn.sanity.io/images/bx0g0zqk/production/6d702c81c861eb682179938a0f9718b8a50edc16-501x301.png',
      title: 'One-Time Payments',
      description: 'Whether you\'re a Startup or Enterprise, you can simply accept credit card, debit card and ACH payments with ease.'
    },
    {
      icon: 'https://cdn.sanity.io/images/bx0g0zqk/production/0e96b0de09ffcd8eb66e7d96b4057a32791d92fc-501x301.png',
      title: 'Recurring Payments & Subscriptions',
      description: 'Set up automatic billing for subscription services or recurring payments. Our flexible system can handle any billing schedule you need, whether it\'s weekly, monthly, or custom intervals.'
    },
    {
      icon: 'https://cdn.sanity.io/images/bx0g0zqk/production/4050aabcb9f6459d3c43f414d00b4f23a7bddd65-501x301.png',
      title: 'Mixed Billing Capabilities',
      description: 'Combine one-time and recurring billing in a single solution. Perfect for businesses that offer both products and services with different billing models.'
    },
    {
      icon: 'https://cdn.sanity.io/images/bx0g0zqk/production/6a8d0edad482f39804796366fd0450204182446e-501x301.png',
      title: 'eCommerce Checkout Optimization',
      description: 'Our checkout is pre-configured for businesses to get started quickly or companies can customize it to blend perfectly with their brand identity.'
    }
  ];
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0066ff] mb-4">
            Flexible Payment Options
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            For Every Type of Business
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get the tools to create a checkout experience that fits your unique business needs. Whether you need one-time payments, subscriptions, or complex billing scenarios.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <img src={feature.icon} alt={feature.title} className="w-24 h-24 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-6 text-lg">
            Learn More About Payment Options
          </Button>
        </div>
      </div>
    </section>
  );
}