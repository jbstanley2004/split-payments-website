import { CheckCircle, Users, BarChart, Zap, Shield, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
export function WhyChoose() {
  const reasons = [
    {
      icon: CheckCircle,
      title: 'Easy, No Stress',
      description: 'Simple application process with minimal paperwork. Get approved quickly and start growing.',
    },
    {
      icon: Users,
      title: 'Sales-Based Repayments',
      description: 'Your repayments automatically adjust based on your card sales. More flexibility when you need it.',
    },
    {
      icon: BarChart,
      title: 'High Approval Rates',
      description: 'We approve businesses that banks turn down. Focus on your sales history, not just credit score.',
    },
    {
      icon: Zap,
      title: 'Fast Funding',
      description: 'Get funds in your account as fast as 24 hours after approval. No long waiting periods.',
    },
    {
      icon: Shield,
      title: 'Transparent',
      description: 'No hidden fees or surprise charges. Clear, straightforward terms you can understand.',
    },
    {
      icon: DollarSign,
      title: 'Better Cash Flow',
      description: 'Maintain healthy cash flow with payments that match your revenue. Never get caught short.',
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            THE BENEFITS
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            Why Businesses Choose Credit Card Splits
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-[#c4ff1a] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <reason.icon className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-bold mb-4">{reason.title}</h4>
              <p className="text-gray-600 mb-6">{reason.description}</p>
              <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}