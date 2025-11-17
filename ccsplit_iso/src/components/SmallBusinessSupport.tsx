import { Button } from './ui/button';
interface SupportCard {
  icon: string;
  title: string;
  description: string;
}
const supportItems: SupportCard[] = [
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/1.png',
    title: 'Stop Bank Loss Approvals',
    description: 'Prevent losses, bypass banks, simplify approval process efficiently.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/2.png',
    title: 'Low Approval Rates',
    description: 'Faster decisions, little worry for ISOs, maximize their time and output.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/3.png',
    title: 'Collateral Requirements',
    description: 'No collateral needed in many cases, making it easier for clients to qualify.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/4.png',
    title: 'Credit Score Barriers',
    description: 'We provide solutions for all credit scores, help clients with limited or poor credit history.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/5.png',
    title: 'Seasonal Cash Flow Gaps',
    description: 'Bridging the gap in off-peak seasons or cash flow shortfalls that ISOs can leverage.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/6.png',
    title: 'High Payroll & Operating Costs',
    description: 'Manage payroll, rent and operational expenses effectively without putting ISOs in a difficult spot.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/7.png',
    title: 'Equipment Upgrades',
    description: 'Offer financing for critical equipment, services that keep small businesses competitive.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/8.png',
    title: 'Marketing & Growth Costs',
    description: 'Help clients fund strategies that drive sales and business expansion.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/1.png',
    title: 'Emergency Expenses',
    description: 'Providing fast access to capital during emergencies for keeping ISOs flexible.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/2.png',
    title: 'Manual Collections & NSF',
    description: 'Help ISOs avoid the manual collection and non-sufficient funds issues that often discourage them.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/3.png',
    title: 'Inventory Shortages',
    description: 'Financing to stock up on inventory, ensuring ISOs can meet client demand and grow their programs.'
  },
  {
    icon: 'https://www.creditcardsplits.com/static/SmallBusiness/4.png',
    title: 'Missed Supplier Discounts',
    description: 'Assisting with bulk purchases / early payment discount opportunities that cut bottom line costs.'
  }
];
export function SmallBusinessSupport() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">CREDITCARDSPLITS OFFERS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Support That Fits Small Business Needs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {supportItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <img src={item.icon} alt="Icon" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button className="bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] font-semibold px-8 py-6">
            Start a Journey
          </Button>
        </div>
      </div>
    </section>
  );
}