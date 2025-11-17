import { Shield, Zap, Users, TrendingUp } from 'lucide-react';
export default function ModernAPIs() {
  const features = [
    {
      icon: Shield,
      title: "Security-first and compliant.",
      description: "Bank-grade security with SOC II Type II compliance. Your customers' data is always protected."
    },
    {
      icon: Users,
      title: "Everyone gets the way they prefer.",
      description: "Support all payment methods your customers need. Cards, ACH, checks, and more."
    },
    {
      icon: Zap,
      title: "Fast onboarding, full control.",
      description: "Get up and running quickly with intuitive APIs and comprehensive documentation."
    },
    {
      icon: TrendingUp,
      title: "Embed easily to existing app flows.",
      description: "Seamlessly integrate payments into your existing user experience with flexible SDKs."
    }
  ];
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1929]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Modern, flexible APIs and SDKs
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-[#1a2f45] p-3 rounded-lg shrink-0">
                <feature.icon className="w-6 h-6 text-[#00d9b8]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}