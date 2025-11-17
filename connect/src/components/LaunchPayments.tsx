import { Building2, CreditCard, Wallet, FileText } from 'lucide-react';
import { Button } from './ui/button';
export default function LaunchPayments() {
  const features = [
    {
      icon: Building2,
      title: "Allow flexibility for buyers and sellers",
      items: [
        "Let your customers pay invoices via card and settle other businesses via ACH or check.",
        "Create a new revenue stream by offering card acceptance."
      ]
    },
    {
      icon: CreditCard,
      title: "Power more revenue streams.",
      items: [
        "Earn revenue on every card transaction processed on Plastiq Connect.",
        "Enable sellers to accept cards and receive bank transfers."
      ]
    },
    {
      icon: Wallet,
      title: "Expand working capital",
      items: [
        "Give customers 30-60 days to settle card balances.",
        "Extend available capital and free up cash flow."
      ]
    },
    {
      icon: FileText,
      title: "Secured financial data",
      items: [
        "A unified, cloud-native platform for all business payments.",
        "Encrypted card and bank data with SOC II Type II compliance."
      ]
    }
  ];
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2137]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Launch payments fast in your software platform or marketplace.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Built for developers by developers and designed to support every type of payment your customers make or accept.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1a2f45] rounded-lg p-8 hover:bg-[#1f3651] transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-[#00d9b8]/10 p-3 rounded-lg">
                  <feature.icon className="w-6 h-6 text-[#00d9b8]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="text-gray-400 flex items-start gap-2">
                        <span className="text-[#00d9b8] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button className="bg-[#00d9b8] hover:bg-[#00c4a7] text-[#0a1929] font-medium px-8 py-6 text-base">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}