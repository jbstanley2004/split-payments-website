import { CheckCircle } from 'lucide-react';
const useCases = [
  {
    title: 'Sales Intelligence',
    description: 'Track performance, forecast revenue, and identify growth opportunities in real-time.'
  },
  {
    title: 'Marketing Analytics',
    description: 'Measure campaign effectiveness and optimize your marketing spend with precision.'
  },
  {
    title: 'Operations Optimization',
    description: 'Streamline processes and reduce costs with actionable operational insights.'
  },
  {
    title: 'Customer Insights',
    description: 'Understand customer behavior and improve satisfaction with data-driven strategies.'
  }
];
function UnleashPower() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Unleash the Power of Your Data
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transform raw data into strategic advantages across your organization
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-white">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <img 
            src="https://jojdwiugelqhcajbccxn.supabase.co/storage/v1/object/public/chat-images/2a03acd8-1b30-48b2-88ba-67663b36c509/0-light" 
            alt="Dashboard Screenshot" 
            className="rounded-lg shadow-2xl border border-white/20 mx-auto max-w-4xl w-full"
          />
        </div>
      </div>
    </section>
  );
}
export default UnleashPower;