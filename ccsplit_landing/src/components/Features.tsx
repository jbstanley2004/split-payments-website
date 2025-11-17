import { Zap, PieChart, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Instant Deposits",
    description: "Access your funds in seconds, not days. Our real-time platform ensures your revenue is always available.",
  },
  {
    icon: PieChart,
    title: "Automated Splits",
    description: "Set it and forget it. Our system automatically splits payments, manages revenue, and simplifies your accounting.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Protect your transactions and customer data with multi-layer security and PCI-compliant infrastructure.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-mid-gray uppercase tracking-widest mb-4">FEATURES</p>
          <h2 className="text-5xl font-bold tracking-tight">
            Why you’ll love Split
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-light rounded-card shadow-soft p-8">
              <div className="bg-light-gray w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-mid-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}